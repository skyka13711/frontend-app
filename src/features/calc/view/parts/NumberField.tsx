import { Field, NumberInput } from '@chakra-ui/react'
import { ConnectedField } from 'effector-forms'

type Props = {
  field: ConnectedField<string>
  label: string
}

export const NumberField = ({ label, field }: Props) => {
  return (
    <Field.Root invalid={field.hasError()}>
      <Field.Label fontWeight="semibold">{label}</Field.Label>
      <NumberInput.Root min={0} width="100%" value={field.value} onValueChange={(e) => field.onChange(e.value)}>
        <NumberInput.Input fontSize={16} placeholder="10" />
      </NumberInput.Root>
      <Field.ErrorText>{field.firstError?.errorText}</Field.ErrorText>
    </Field.Root>
  )
}
