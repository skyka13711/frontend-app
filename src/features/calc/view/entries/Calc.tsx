import { memo } from 'react'
import { useUnit } from 'effector-react'
import { Box, Stack } from '@chakra-ui/react'

import { BaseInfo, SetupAdditionalService } from '../container'
import { $step } from '../../model/private'

const STEPS = [<BaseInfo />, <SetupAdditionalService />, <SetupAdditionalService />, <SetupAdditionalService />]

export const Calc = memo(() => {
  const step = useUnit($step)

  return (
    <Box shadow="lg" p={5} borderRadius={16}>
      <Stack direction="column" gap={5}>
        {STEPS[step - 1] || null}
      </Stack>
    </Box>
  )
})
