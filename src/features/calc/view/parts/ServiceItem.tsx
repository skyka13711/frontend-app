import React, { useCallback } from 'react'
import { Checkbox, Stack, Text } from '@chakra-ui/react'

import { ServiceOption } from '../../model/types'

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
        <Stack gap={4} width="100%" ml={parentId ? 6 : 0}>
          {items.map((option) => {
            const isSelected = Boolean(selected[parentId || groupId]?.includes(option.id))
            return (
              <React.Fragment key={option.id}>
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
                </Checkbox.Root>
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
