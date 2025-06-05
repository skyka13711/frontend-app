import { memo, useCallback } from 'react'
import { Box, Button, Stack, Text, Accordion } from '@chakra-ui/react'
import { LuArrowRight, LuChevronDown, LuDownload } from 'react-icons/lu'
import { useUnit } from 'effector-react'

import { StepHeader } from './StepHeader'
import { $groupsCost, $totalCost, nextStep } from '../../model/private'
import { GroupItem } from '../../model/types'
import { formatCurrency } from '@/lib/formatCurrency'

export const Total = memo(() => {
  const groups = useUnit($groupsCost)
  const total = useUnit($totalCost)

  const renderSubItem = useCallback((item: GroupItem, level = 0) => {
    const hasSubGroups = item.subGroups && item.subGroups.length > 0

    if (!hasSubGroups) {
      return (
        <Box key={item.id} p={2} borderRadius={8} borderWidth={1} borderColor="gray.200" bg="gray.50">
          <Stack gap={1}>
            <Text fontWeight="medium" fontSize="sm" color="blue.800">
              {item.label}
            </Text>
            <Text color="gray.700" fontSize="xs">
              Стоимость:{' '}
              <Text as="span" fontWeight="semibold">
                {formatCurrency(item.itemPrice)}
              </Text>
            </Text>
          </Stack>
        </Box>
      )
    }

    return (
      <Accordion.Root key={item.id} collapsible variant="enclosed">
        <Accordion.Item value={item.id.toString()} pb={1}>
          <Accordion.ItemTrigger p={2} bg="white" borderColor="gray.300" _hover={{ bg: 'gray.50' }}>
            <Stack direction="row" justify="space-between" align="center" width="100%">
              <Stack gap={1} align="flex-start">
                <Text fontWeight="semibold" fontSize="sm" color="blue.800">
                  {item.label}
                </Text>
                <Stack direction="column" gap={1} fontSize="xs" color="gray.600">
                  <Text>
                    Основная услуга:{' '}
                    <Text as="span" textWrap={'nowrap'} fontWeight="semibold">
                      {formatCurrency(item.itemPrice)}
                    </Text>
                  </Text>
                  {item.groupTotal !== item.itemPrice && (
                    <Text>
                      Доп. услуги:{' '}
                      <Text as="span" textWrap={'nowrap'} fontWeight="semibold">
                        {formatCurrency(item.groupTotal - item.itemPrice)}
                      </Text>
                    </Text>
                  )}
                  <Text fontSize="sm" textWrap={'nowrap'} fontWeight="bold" color="blue.700">
                    {formatCurrency(item.groupTotal)}
                  </Text>
                </Stack>
              </Stack>
              <Stack align="flex-end" gap={0}>
                <Accordion.ItemIndicator>
                  <LuChevronDown />
                </Accordion.ItemIndicator>
              </Stack>
            </Stack>
          </Accordion.ItemTrigger>

          <Accordion.ItemContent pt={3} px={0}>
            <Stack gap={4}>{item.subGroups?.map((subItem) => renderSubItem(subItem, level + 1))}</Stack>
          </Accordion.ItemContent>
        </Accordion.Item>
      </Accordion.Root>
    )
  }, [])

  const renderMainGroup = useCallback(
    (group: GroupItem) => {
      return (
        <Accordion.Root
          key={group.id}
          collapsible
          variant="enclosed"
          borderRadius={12}
          overflow="hidden"
          boxShadow="md"
        >
          <Accordion.Item value={group.id.toString()}>
            <Accordion.ItemTrigger
              p={4}
              bg="blue.50"
              borderBottomWidth={1}
              borderBottomColor="blue.100"
              _hover={{ bg: 'blue.100' }}
            >
              <Stack direction="row" justify="space-between" align="center" width="100%">
                <Stack>
                  <Text fontSize="lg" fontWeight="bold" color="blue.900">
                    {group.label}
                  </Text>
                  <Text fontSize="lg" fontWeight="bold" color="blue.800">
                    {formatCurrency(group.groupTotal)}
                  </Text>
                </Stack>

                <Accordion.ItemIndicator>
                  <LuChevronDown />
                </Accordion.ItemIndicator>
              </Stack>
            </Accordion.ItemTrigger>

            <Accordion.ItemContent p={4} bg="white">
              <Stack gap={4}>{group.subGroups?.map((subItem) => renderSubItem(subItem, 0))}</Stack>
            </Accordion.ItemContent>
          </Accordion.Item>
        </Accordion.Root>
      )
    },
    [renderSubItem]
  )

  return (
    <>
      <StepHeader />
      <Stack gap={4}>
        {groups?.map(renderMainGroup)}

        <Stack
          gap={2}
          align="flex-end"
          p={4}
          borderRadius={12}
          bg="blue.50"
          boxShadow="md"
          borderWidth={2}
          borderColor="blue.200"
        >
          <Text fontSize="lg" color="gray.700" fontWeight="medium">
            Итого:
          </Text>
          <Text fontSize="2xl" fontWeight="bold" color="blue.900">
            {formatCurrency(total)}
          </Text>
        </Stack>
      </Stack>

      <Button size="xl" onClick={() => nextStep()} colorPalette="blue" variant="solid" mt={6}>
        <Box width="100%">Сохранить</Box>
        <LuDownload />
      </Button>
    </>
  )
})
