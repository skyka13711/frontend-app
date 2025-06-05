import { memo, useCallback } from 'react'
import { Box, Button, Stack, Text, Accordion } from '@chakra-ui/react'
import { LuArrowRight, LuChevronDown } from 'react-icons/lu'
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
    const marginLeft = level * 4

    if (!hasSubGroups) {
      // Простой элемент без подгрупп
      return (
        <Box
          key={item.id}
          ml={marginLeft}
          p={3}
          borderRadius={8}
          borderWidth={1}
          borderColor="gray.200"
          bg="gray.50"
          mb={2}
        >
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

    // Элемент с подгруппами - используем аккордеон
    return (
      <Accordion.Root key={item.id} collapsible variant="enclosed" ml={marginLeft} mb={2}>
        <Accordion.Item value={item.id.toString()}>
          <Accordion.ItemTrigger
            p={3}
            borderRadius={8}
            bg="white"
            borderWidth={1}
            borderColor="gray.300"
            _hover={{ bg: 'gray.50' }}
          >
            <Stack direction="row" justify="space-between" align="center" width="100%">
              <Stack gap={1} align="flex-start">
                <Text fontWeight="semibold" fontSize="sm" color="blue.800">
                  {item.label}
                </Text>
                <Stack direction="row" gap={4} fontSize="xs" color="gray.600">
                  <Text>
                    Основная услуга:{' '}
                    <Text as="span" fontWeight="semibold">
                      {formatCurrency(item.itemPrice)}
                    </Text>
                  </Text>
                  {item.groupTotal !== item.itemPrice && (
                    <Text>
                      Доп. услуги:{' '}
                      <Text as="span" fontWeight="semibold">
                        {formatCurrency(item.groupTotal - item.itemPrice)}
                      </Text>
                    </Text>
                  )}
                </Stack>
              </Stack>
              <Stack align="flex-end" gap={0}>
                <Text fontSize="sm" fontWeight="bold" color="blue.700">
                  {formatCurrency(item.groupTotal)}
                </Text>
                <Accordion.ItemIndicator>
                  <LuChevronDown />
                </Accordion.ItemIndicator>
              </Stack>
            </Stack>
          </Accordion.ItemTrigger>

          <Accordion.ItemContent p={3} pt={0}>
            <Stack gap={2} ml={2}>
              {item.subGroups?.map((subItem) => renderSubItem(subItem, level + 1))}
            </Stack>
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
                <Text fontSize="lg" fontWeight="bold" color="blue.900">
                  {group.label}
                </Text>
                <Stack direction="row" align="center" gap={3}>
                  <Text fontSize="lg" fontWeight="bold" color="blue.800">
                    {formatCurrency(group.groupTotal)}
                  </Text>
                  <Accordion.ItemIndicator>
                    <LuChevronDown />
                  </Accordion.ItemIndicator>
                </Stack>
              </Stack>
            </Accordion.ItemTrigger>

            <Accordion.ItemContent p={4} bg="white">
              <Stack gap={2}>{group.subGroups?.map((subItem) => renderSubItem(subItem, 0))}</Stack>
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
        <LuArrowRight />
      </Button>
    </>
  )
})
