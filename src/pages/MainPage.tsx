import { memo } from 'react'
import { Container, Box } from '@chakra-ui/react'

import { Calc } from '@/features/calc/view'

export const MainPage = memo(() => {
  return (
    <Container flexGrow={1} display="flex" justifyContent="space-between" flexDirection="column">
      <Box width="100%" flexGrow={1} maxWidth={520} mx={'auto'} my={5}>
        <Calc />
      </Box>
    </Container>
  )
})
