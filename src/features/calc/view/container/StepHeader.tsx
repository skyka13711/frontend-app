import { Button, Stack, Text } from '@chakra-ui/react'
import { useUnit } from 'effector-react'
import { LuArrowLeft } from 'react-icons/lu'
import { memo } from 'react'

import { $canGoPrev, $isLastStep, prevStep } from '../../model/private'

export const StepHeader = memo(() => {
  const { canGoPrev, isLast, handlePrevStep } = useUnit({
    canGoPrev: $canGoPrev,
    isLast: $isLastStep,
    handlePrevStep: prevStep
  })

  if (!canGoPrev) {
    return (
      <Text fontSize="lg" sm={{ fontSize: '2xl' }} fontWeight="bold">
        Расчет стоимости АСУЗ
      </Text>
    )
  }
  return (
    <Button onClick={handlePrevStep} variant="ghost" width="100%" justifyContent="flex-start" p={0}>
      {canGoPrev && <LuArrowLeft size={24} />}
      <Text fontSize="lg" sm={{ fontSize: '2xl' }} fontWeight="bold">
        {isLast ? 'Сохранить' : 'Расчет стоимости АСУЗ'}
      </Text>
    </Button>
  )
})
