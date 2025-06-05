import { useUnit } from 'effector-react'
import { $additionalServices, $selectedAdditionalOptions, nextStep, toggleAdditionalOption } from '../../model/private'
import { ServiceItem } from '../parts'
import { StepHeader } from './StepHeader'
import { Box, Button } from '@chakra-ui/react'
import { LuArrowRight } from 'react-icons/lu'

export const SetupAdditionalService = () => {
  const services = useUnit($additionalServices)
  const handleToggle = useUnit(toggleAdditionalOption)
  const selectedOptions = useUnit($selectedAdditionalOptions)
  return (
    <>
      <StepHeader />
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
      <Button size="xl" onClick={() => nextStep()} colorPalette="blue" variant="solid">
        <Box width="100%">Рассчитать</Box> <LuArrowRight />
      </Button>
    </>
  )
}
