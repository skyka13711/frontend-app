import { memo, useCallback } from 'react'
import { Box, Button, Stack, Text, List } from '@chakra-ui/react'
import { LuArrowRight } from 'react-icons/lu'
import { useUnit } from 'effector-react'

import { StepHeader } from './StepHeader'
import { $groupsCost, $totalCost, nextStep } from '../../model/private'
import { GroupItem } from '../../model/types'
import { formatCurrency } from '@/lib/formatCurrency'

export const Total = memo(() => {
  const groups = useUnit($groupsCost)
  const total = useUnit($totalCost)

  const renderItem = useCallback((item: GroupItem) => {
    return (
      <List.Item gap={2} key={item.id} ml={2} mb={4}>
        <Stack gap={1}>
          <Box fontWeight="bold">{item.label}</Box>
          <Box>Стоимость услуги: {formatCurrency(item.itemPrice)}</Box>
        </Stack>
        {item.subGroups && <List.Root mt={4}>{item.subGroups.map(renderItem)}</List.Root>}
        {item.subGroups && (
          <>
            <Box>Стоимость доп услуг: {formatCurrency(item.groupTotal - item.itemPrice)}</Box>
            <Box>Общая стоимость: {formatCurrency(item.groupTotal)}</Box>
          </>
        )}
      </List.Item>
    )
  }, [])

  return (
    <>
      <StepHeader />
      <Stack gap={5}>
        <Stack gap={3}>
          {groups?.map((group) => (
            <Stack gap={2} key={group.id}>
              <Text fontSize="xl" fontWeight="bold">
                {group.label}
              </Text>
              <List.Root>{group.subGroups?.map(renderItem)}</List.Root>
              <Text>
                Общая стоимость в категории "{group.label}": {formatCurrency(group.groupTotal)}
              </Text>
            </Stack>
          ))}
        </Stack>

        <Stack gap={1}>
          <Text>Итого:</Text>
          <Text>{formatCurrency(total)}</Text>
        </Stack>
      </Stack>
      <Button size="xl" onClick={() => nextStep()} colorPalette="blue" variant="solid">
        <Box width="100%">Сохранить</Box> <LuArrowRight />
      </Button>
    </>
  )
})
