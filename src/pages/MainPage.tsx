import { memo } from 'react'
import { Container, Box } from '@chakra-ui/react'

import { Footer } from '@/components/ui/Footer'
import { Header } from '@/components/ui/Header'
import { Calc } from '@/features/calc/view'

export const MainPage = memo(() => {
  return (
    <Container flexGrow={1} display="flex" justifyContent="space-between" flexDirection="column">
      <Header />
      <Box width="100%" flexGrow={1} maxWidth={520} mx={'auto'}>
        <Calc />
      </Box>
      <Footer />
    </Container>
  )
})
