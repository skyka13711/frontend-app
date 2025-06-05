import { useUnit } from 'effector-react'
import { Box, Button, Stack } from '@chakra-ui/react'
import { LuArrowRight } from 'react-icons/lu'

import {
  $additionalServices,
  $selectedAdditionalOptions,
  nextStep,
  prevStep,
  toggleAdditionalOption
} from '../../model/private'
import { ServiceItem, StepHeader } from '../parts'

export const SetupAdditionalService = () => {
  const services = useUnit($additionalServices)
  const handleToggle = useUnit(toggleAdditionalOption)
  const selectedOptions = useUnit($selectedAdditionalOptions)
  return (
    <>
      <StepHeader onGoBack={prevStep} title="Расчет стоимости АСУЗ" />
      <Stack height="100%">
        {services.map(({ id, label, options }) => {
          return (
            <ServiceItem
              onToggle={handleToggle}
              options={options}
              selected={selectedOptions}
              title={label}
              key={id}
              groupId={id}
            />
          )
        })}
      </Stack>

      <Button size="xl" onClick={() => nextStep()} colorPalette="blue" variant="solid">
        <Box width="100%">Рассчитать</Box> <LuArrowRight />
      </Button>
    </>
  )
}
