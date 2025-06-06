import { useForm } from 'effector-forms'
import { memo } from 'react'
import { LuArrowRight } from 'react-icons/lu'

import { baseInfoForm } from '../../model/private'
import { FormLayout, NumberField, RadioField } from '../parts'
import { PlumbingType } from '../../model/types'

const PLUMBING_OPTIONS = [
  { value: PlumbingType.Vertical, label: 'Вертикальная (стояковая)' },
  { value: PlumbingType.Collector, label: 'Коллекторная горизонтальная' }
]

export const BaseInfo = memo(() => {
  const { fields, submit } = useForm(baseInfoForm)

  return (
    <FormLayout
      title="Расчет стоимости АСУЗ"
      buttonLabel="Продолжить"
      onButtonClick={submit}
      buttonIcon={<LuArrowRight />}
      buttonType="surface"
      gap={5}
    >
      <NumberField field={fields.area} label="Общая жилая (продаваемая) площадь, м²" />
      <NumberField field={fields.sections} label="Количество секций" />
      <NumberField field={fields.apartments} label="Количество квартир" />
      <NumberField field={fields.apartmentsOnFloor} label="Количество квартир на этаже" />
      <NumberField field={fields.floors} label="Количество этажей" />

      <RadioField<PlumbingType>
        isInvalid={fields.plumbingType.hasError()}
        label="Тип разводки ХВС/ГВС"
        value={fields.plumbingType.value}
        onChange={(v) => fields.plumbingType.onChange(v)}
        options={PLUMBING_OPTIONS}
        errorText={fields.plumbingType.firstError?.errorText}
      />
    </FormLayout>
  )
})
