import { Button, Text } from '@chakra-ui/react'
import { LuArrowLeft } from 'react-icons/lu'
import { memo } from 'react'

type Props = {
  title: string
  onGoBack?: () => void
}

export const StepHeader = memo(({ title, onGoBack }: Props) => {
  if (!onGoBack) {
    return (
      <Text fontSize="lg" sm={{ fontSize: '2xl' }} fontWeight="bold">
        {title}
      </Text>
    )
  }
  return (
    <Button onClick={onGoBack} variant="ghost" width="100%" justifyContent="flex-start" p={0}>
      <LuArrowLeft size={24} />
      <Text fontSize="lg" sm={{ fontSize: '2xl' }} fontWeight="bold">
        {title}
      </Text>
    </Button>
  )
})
