import { Field, RadioGroup } from '@chakra-ui/react'

export interface RadioOption<T extends string> {
  value: T
  label: string
}

type Props<T extends string> = {
  isInvalid: boolean
  label: string
  value: T
  errorText?: string
  onChange: (value: T) => void
  options: RadioOption<T>[]
}

export const RadioField = <T extends string>({ isInvalid, label, onChange, options, value, errorText }: Props<T>) => {
  return (
    <Field.Root gap={4} invalid={isInvalid}>
      <Field.Label fontWeight="semibold">{label}</Field.Label>
      <RadioGroup.Root
        value={value}
        onValueChange={(details) => onChange(details.value as T)}
        display="flex"
        flexDirection="column"
        gap={6}
      >
        {options.map((option) => (
          <RadioGroup.Item key={option.value} value={option.value}>
            <RadioGroup.ItemHiddenInput />
            <RadioGroup.ItemIndicator />
            <RadioGroup.ItemText>{option.label}</RadioGroup.ItemText>
          </RadioGroup.Item>
        ))}
      </RadioGroup.Root>
      <Field.ErrorText>{errorText}</Field.ErrorText>
    </Field.Root>
  )
}
