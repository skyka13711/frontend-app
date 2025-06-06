import { memo } from 'react'
import { useUnit } from 'effector-react'
import { Box, Stack } from '@chakra-ui/react'

import { BaseInfo, SaveResult, SendToEmail, SetupAdditionalService, Total } from '../container'
import { $step } from '../../model/private'
import { Step } from '../../model/types'

const STEPS = {
  [Step.BaseInfo]: <BaseInfo />,
  [Step.AdditionalService]: <SetupAdditionalService />,
  [Step.Total]: <Total />,
  [Step.Save]: <SaveResult />,
  [Step.SendToEmail]: <SendToEmail />,
  [Step.Contact]: null
}

export const Calc = memo(() => {
  const step = useUnit($step)

  return (
    <Box height="100%" shadow="lg" p={5} borderRadius={16}>
      <Stack direction="column" gap={5} height="100%">
        {STEPS[step] || null}
      </Stack>
    </Box>
  )
})
