import { Button, Stack, Text } from '@chakra-ui/react'
import { useUnit } from 'effector-react'
import { LuArrowLeft } from 'react-icons/lu'
import { memo } from 'react'

import { $canGoPrev, prevStep } from '../../model/private'

type Props = {
  title: string
}

export const StepHeader = memo(({ title }: Props) => {
  const { canGoPrev, handlePrevStep } = useUnit({
    canGoPrev: $canGoPrev,
    handlePrevStep: prevStep
  })

  if (!canGoPrev) {
    return (
      <Text fontSize="lg" sm={{ fontSize: '2xl' }} fontWeight="bold">
        {title}
      </Text>
    )
  }
  return (
    <Button onClick={handlePrevStep} variant="ghost" width="100%" justifyContent="flex-start" p={0}>
      {canGoPrev && <LuArrowLeft size={24} />}
      <Text fontSize="lg" sm={{ fontSize: '2xl' }} fontWeight="bold">
        {title}
      </Text>
    </Button>
  )
})
