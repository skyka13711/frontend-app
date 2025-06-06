import { combine, createApi, createDomain } from 'effector'
import { createForm } from 'effector-forms'

import { rules } from '@/lib/validators'

import { AdditionalService, BaseInfoFormFields, GroupItem, PlumbingType, Prices, Step } from './types'
import { additionalServiceMock, pricesMock } from './const'
import { createOptionsMap, getVisibleServices } from './helpers'

const d = createDomain('calc')

export const $step = d.store<Step>(Step.AdditionalService)
export const $prices = d.store<Prices | null>(pricesMock)
export const $additionalServices = d.store(additionalServiceMock)
export const $selectedAdditionalOptions = d.store<Record<string, string[]>>({})

export const setStep = d.event<Step>()

export const toggleAdditionalOption = d.event<{ groupId: string; optionId: string }>()

export const baseInfoForm = createForm<BaseInfoFormFields>({
  domain: d,
  fields: {
    area: {
      init: '',
      rules: [rules.required('Общая жилая (продаваемая) площадь обязательна')]
    },
    floors: {
      init: '',
      rules: [rules.required('Количество этажей обязательно')]
    },
    sections: {
      init: '',
      rules: [rules.required('Количество секций обязательно')]
    },
    apartments: {
      init: '',
      rules: [rules.required('Количество квартир обязательно')]
    },
    roomOnFloor: {
      init: '',
      rules: [rules.required('Количество квартир обязательно')]
    },
    plumbingType: {
      init: PlumbingType.Vertical,
      rules: [rules.required('Тип разводки ХВС/ГВС обязателен')]
    }
  }
})

export const $visibleServices = combine(
  {
    services: $additionalServices,
    plumbingType: baseInfoForm.fields.plumbingType.$value
  },
  ({ services, plumbingType }): AdditionalService[] | null => {
    if (!services) return null

    return getVisibleServices(services, plumbingType)
  }
)

const $optionsMap = $visibleServices.map((services) => {
  if (!services) return null
  return createOptionsMap(services)
})

export const $groupsCost = combine(
  {
    prices: $prices,
    formValues: baseInfoForm.$values,
    selectedOptions: $selectedAdditionalOptions,
    services: $additionalServices,
    optionsMap: $optionsMap
  },
  ({ prices, selectedOptions, services, optionsMap }) => {
    if (!prices || !optionsMap) return null

    const calculateGroupCost = (groupId: string): number => {
      const selectedIds = selectedOptions[groupId]
      if (!selectedIds?.length) return 0

      return selectedIds.reduce((total, optionId) => {
        const childCost = calculateGroupCost(optionId)
        const optionPrice = optionsMap[optionId]?.price || 0
        return total + childCost + optionPrice
      }, 0)
    }

    const createGroupItem = (itemId: string): GroupItem | null => {
      const item = services.find((service) => service.id === itemId) || optionsMap[itemId]

      if (!item) return null

      const childrenIds = selectedOptions[itemId]
      const hasChildren = childrenIds && childrenIds.length > 0
      const itemPrice = 'price' in item ? item.price : 0
      const groupTotal = calculateGroupCost(itemId) + itemPrice

      return {
        id: itemId,
        label: item.label || '',
        itemPrice,
        groupTotal,
        subGroups: hasChildren
          ? childrenIds.map(createGroupItem).filter((item): item is GroupItem => item !== null)
          : undefined
      }
    }

    return services
      .map((service) => createGroupItem(service.id))
      .filter((item): item is GroupItem => item !== null && item.groupTotal > 0)
  }
)

export const $totalCost = $groupsCost.map((groups) => {
  if (!groups) return 0
  return groups.reduce((total, group) => total + group.groupTotal, 0)
})
