import { combine, createApi, createDomain, sample } from 'effector'
import { createForm } from 'effector-forms'
import { rules } from '@/lib/validators'
import { BaseInfoFormFields, PlumbingType, Prices, ServiceOption } from './types'
import { additionalServiceMock, pricesMock } from './const'

export const STEP_COUNT = 4 // Total number of steps in the form
const d = createDomain('calc')

export const $step = d.store<number>(1)
export const { nextStep, prevStep } = createApi($step, {
  nextStep: (state) => state + 1,
  prevStep: (state) => state - 1
})

export const $canGoPrev = $step.map((step) => step > 1)
export const $isLastStep = $step.map((step) => step === STEP_COUNT)

export const $prices = d.store<Prices | null>(pricesMock)

export const $additionalServices = d.store(additionalServiceMock)

export const $selectedAdditionalOptions = d.store<Record<string, string[]>>({})

export const toggleAdditionalOption = d.event<{ groupId: string; optionId: string }>()

$selectedAdditionalOptions.on(toggleAdditionalOption, (state, { groupId, optionId }) => {
  const newState = { ...state }
  const group = newState[groupId] || []
  const exists = group.includes(optionId)
  let nextGroup: string[]
  if (exists) {
    nextGroup = group.filter((id) => id !== optionId)
    const removeSubThree = (id: string) => {
      if (newState[id]) {
        newState[id].forEach(removeSubThree)
        delete newState[id]
      }
    }
    group.forEach(removeSubThree)
  } else {
    nextGroup = [...group, optionId]
  }
  if (nextGroup.length === 0) {
    delete newState[groupId]
    return newState
  }
  return { ...newState, [groupId]: nextGroup }
})

export const baseInfoForm = createForm<BaseInfoFormFields>({
  domain: d,
  fields: {
    area: {
      init: '10',
      rules: [rules.required('Общая жилая (продаваемая) площадь обязательна')]
    },
    floors: {
      init: '10',
      rules: [rules.required('Количество этажей обязательно')]
    },
    sections: {
      init: '10',
      rules: [rules.required('Количество секций обязательно')]
    },
    apartments: {
      init: '10',
      rules: [rules.required('Количество квартир обязательно')]
    },
    plumbingType: {
      init: PlumbingType.Vertical,
      rules: [rules.required('Тип разводки ХВС/ГВС обязателен')]
    }
  }
})

const $flatOptionsList = $additionalServices.map((services) => {
  const mapOptions = (option: ServiceOption): ServiceOption[] | ServiceOption => {
    if (option.subOptions) return [option, ...option.subOptions.flatMap(mapOptions)]
    return option
  }
  return services.flatMap((g) => g.options.map(mapOptions)).flat()
})

export const $groupCost = combine(
  {
    prices: $prices,
    form: baseInfoForm.$values,
    additionalOptions: $selectedAdditionalOptions,
    additionalServices: $additionalServices,
    flatOptionsList: $flatOptionsList
  },
  ({ prices, form, additionalOptions, additionalServices, flatOptionsList }) => {
    if (!prices) return null
    if (!form.area || !form.floors || !form.sections || !form.apartments) return null

    // const areaCost = parseFloat(form.area) * prices.area
    // const floorsCost = parseInt(form.floors, 10) * prices.floors
    // const sectionsCost = parseInt(form.sections, 10) * prices.sections
    // const apartmentsCost = parseInt(form.apartments, 10) * prices.apartments
    // const plumbingCost = prices.plumbingType[form.plumbingType]

    const groupsId = additionalServices.map((g) => g.id)

    const calcGroupCost = (groupId: string): number => {
      let groupCost = 0
      const selectedOptions = additionalOptions[groupId]
      if (!selectedOptions) return groupCost
      selectedOptions.forEach((id) => {
        groupCost += calcGroupCost(id)
        groupCost += flatOptionsList.find((g) => g.id === groupId)?.price || 0
      })
      return groupCost
    }

    const result = groupsId.map((groupId) => {
      return {
        groupId,
        groupLabel: additionalServices.find((g) => g.id === groupId)?.label || '',
        groupCost: calcGroupCost(groupId)
      }
    })

    return result
  }
)

sample({
  clock: baseInfoForm.formValidated,
  target: nextStep
})
