import { Field, NumberInput } from '@chakra-ui/react'

type Props = {
  isValid: boolean
  label: string
  value: string
  errorText?: string
  onChange: (value: string) => void
}

export const NumberField = ({ isValid, label, onChange, value, errorText }: Props) => {
  return (
    <Field.Root invalid={isValid}>
      <Field.Label fontWeight="semibold">{label}</Field.Label>
      <NumberInput.Root min={0} width="100%" value={value} onValueChange={(e) => onChange(e.value)}>
        <NumberInput.Control />
        <NumberInput.Input fontSize={16} placeholder="10" />
      </NumberInput.Root>
      <Field.ErrorText>{errorText}</Field.ErrorText>
    </Field.Root>
  )
}
