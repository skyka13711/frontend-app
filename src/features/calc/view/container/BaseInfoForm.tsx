import { Box, Stack, Text, Button } from '@chakra-ui/react'
import { useForm } from 'effector-forms'
import React, { memo } from 'react'
import { LuArrowRight } from 'react-icons/lu'

import { baseInfoForm, PlumbingType } from '../../model/private'
import { NumberField, RadioField } from '../parts'

const PLUMBING_OPTIONS = [
  { value: PlumbingType.Vertical, label: 'Вертикальная' },
  { value: PlumbingType.Collector, label: 'Коллекторная горизонтальная' },
  { value: PlumbingType.Standpipe, label: 'Стояковая с байпасами' },
  { value: PlumbingType.Other, label: 'Другое' }
]

export const BaseInfoForm = memo(() => {
  const { fields, submit } = useForm(baseInfoForm)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    submit()
  }

  return (
    <Box shadow="lg" p={5} borderRadius={16}>
      <Stack direction="column" gap={5}>
        <Text fontSize="lg" sm={{ fontSize: '2xl' }} fontWeight="bold">
          Расчет стоимости АСУЗ
        </Text>
        <form onSubmit={handleSubmit}>
          <Stack gap={5}>
            <NumberField
              isValid={fields.area.hasError()}
              label="Общая жилая (продаваемая) площадь, м²"
              value={fields.area.value}
              onChange={(v) => fields.area.onChange(String(v))}
              errorText={fields.area.firstError?.errorText}
            />
            <NumberField
              isValid={fields.floors.hasError()}
              label="Количество этажей"
              value={fields.floors.value}
              onChange={(v) => fields.floors.onChange(String(v))}
              errorText={fields.floors.firstError?.errorText}
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

            <RadioField<PlumbingType>
              isInvalid={fields.plumbingType.hasError()}
              label="Тип разводки ХВС/ГВС"
              value={fields.plumbingType.value}
              onChange={(v) => fields.plumbingType.onChange(v)}
              options={PLUMBING_OPTIONS}
              errorText={fields.plumbingType.firstError?.errorText}
            />

            <Button type="submit" colorPalette="blue" variant="surface">
              <Box width="100%">Продолжить</Box> <LuArrowRight />
            </Button>
          </Stack>
        </form>
      </Stack>
    </Box>
  )
})
