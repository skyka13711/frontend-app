import { Stack } from '@chakra-ui/react'
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
    <>
      <FormLayout
        title="Расчет стоимости АСУЗ"
        buttonLabel="Продолжить"
        onButtonClick={submit}
        buttonIcon={<LuArrowRight />}
        buttonType="surface"
      >
        <Stack height="100%" gap={5}>
          <NumberField
            isValid={fields.area.hasError()}
            label="Общая жилая (продаваемая) площадь, м²"
            value={fields.area.value}
            onChange={(v) => fields.area.onChange(String(v))}
            errorText={fields.area.firstError?.errorText}
          />
          <NumberField
            isValid={fields.sections.hasError()}
            label="Количество секций"
            value={fields.sections.value}
            onChange={(v) => fields.sections.onChange(String(v))}
            errorText={fields.sections.firstError?.errorText}
          />
          <NumberField
            isValid={fields.apartments.hasError()}
            label="Количество квартир"
            value={fields.apartments.value}
            onChange={(v) => fields.apartments.onChange(String(v))}
            errorText={fields.apartments.firstError?.errorText}
          />
          <NumberField
            isValid={fields.roomOnFloor.hasError()}
            label="Количество квартир на этаже"
            value={fields.roomOnFloor.value}
            onChange={(v) => fields.roomOnFloor.onChange(String(v))}
            errorText={fields.roomOnFloor.firstError?.errorText}
          />
          <NumberField
            isValid={fields.floors.hasError()}
            label="Количество этажей"
            value={fields.floors.value}
            onChange={(v) => fields.floors.onChange(String(v))}
            errorText={fields.floors.firstError?.errorText}
          />
          <RadioField<PlumbingType>
            isInvalid={fields.plumbingType.hasError()}
            label="Тип разводки ХВС/ГВС"
            value={fields.plumbingType.value}
            onChange={(v) => fields.plumbingType.onChange(v)}
            options={PLUMBING_OPTIONS}
            errorText={fields.plumbingType.firstError?.errorText}
          />
        </Stack>
      </FormLayout>
    </>
  )
})
