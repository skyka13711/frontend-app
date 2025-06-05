import React, { useCallback } from 'react'
import { Box, Checkbox, Popover, Stack, Text } from '@chakra-ui/react'

import { ServiceOption } from '../../model/types'
import { LuChevronDown } from 'react-icons/lu'

type Props = {
  title: string
  options: ServiceOption[]
  onToggle: (params: { groupId: string; optionId: string }) => void
  selected: Record<string, string[]>
  groupId: string
}

export const ServiceItem = ({ onToggle, options, selected, title, groupId }: Props) => {
  const renderList = useCallback(
    (items: ServiceOption[], parentId?: string) => {
      return (
        <Stack gap={4} ml={parentId ? 6 : 0}>
          {items.map((option) => {
            const isSelected = Boolean(selected[parentId || groupId]?.includes(option.id))
            return (
              <React.Fragment key={option.id}>
                <Stack flexDirection={'row'} justifyContent="space-between">
                  <Checkbox.Root
                    cursor="pointer"
                    onCheckedChange={() => onToggle({ groupId: parentId || groupId, optionId: option.id })}
                    checked={isSelected}
                    variant="solid"
                  >
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                    <Checkbox.Label fontWeight="semibold" fontSize="sm">
                      {option.label}
                    </Checkbox.Label>
                    {Boolean(option.subOptions?.length) && <LuChevronDown />}
                  </Checkbox.Root>
                  <Popover.Root>
                    <Popover.Trigger>
                      <Box
                        cursor="pointer"
                        width={5}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        height={5}
                        bg="gray.500"
                        borderRadius="50%"
                        p={1}
                        color="white"
                      >
                        ?
                      </Box>
                    </Popover.Trigger>
                    <Popover.Positioner>
                      <Popover.Content>
                        <Popover.CloseTrigger />
                        <Popover.Arrow>
                          <Popover.ArrowTip />
                        </Popover.Arrow>
                        <Popover.Body>
                          <Popover.Title>test info</Popover.Title>
                        </Popover.Body>
                      </Popover.Content>
                    </Popover.Positioner>
                  </Popover.Root>
                </Stack>
                {isSelected &&
                  Boolean(option.subOptions?.length) &&
                  renderList(option.subOptions as ServiceOption[], option.id)}
              </React.Fragment>
            )
          })}
        </Stack>
      )
    },
    [onToggle, selected]
  )

  return (
    <Stack gap={5} width="100%">
      <Text fontWeight="semibold" fontSize="sm">
        {title}
      </Text>
      {renderList(options)}
    </Stack>
  )
}
