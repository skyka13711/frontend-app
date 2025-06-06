import { Box, Button, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { LuArrowLeft } from 'react-icons/lu'

type Props = {
  title: string
  buttonLabel: string
  onButtonClick: () => void
  onGoBack?: () => void
  buttonIcon: React.ReactNode
  buttonType?: 'solid' | 'surface'
}

type HeaderProps = {
  title: string
  onGoBack?: () => void
}

const Header = ({ title, onGoBack }: HeaderProps) => {
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
}

export const FormLayout = ({
  buttonLabel,
  title,
  children,
  buttonIcon,
  onButtonClick,
  onGoBack,
  buttonType
}: Props & React.PropsWithChildren) => {
  return (
    <>
      <Header onGoBack={onGoBack} title={title} />
      <Stack height="100%">{children}</Stack>

      <Button size="xl" onClick={onButtonClick} colorPalette="blue" variant={buttonType || 'solid'}>
        <Box width="100%">{buttonLabel}</Box> {buttonIcon}
      </Button>
    </>
  )
}
