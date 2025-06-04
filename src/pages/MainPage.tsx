import { memo } from 'react'
import { Container, Box } from '@chakra-ui/react'

import { Footer } from '@/components/ui/Footer'
import { Header } from '@/components/ui/Header'
import { Calc } from '@/features/calc/view'

export const MainPage = memo(() => {
  return (
    <Container flexGrow={1} display="flex" flexDirection="column">
      <Header />
      <Box width="100%">
        <Calc />
      </Box>
      <Footer />
    </Container>
  )
})
