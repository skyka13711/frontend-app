import { Field, FieldRequiredIndicator, Input, InputProps } from '@chakra-ui/react'
import { ConnectedField } from 'effector-forms'
import { withMask } from 'use-mask-input'

type Props = {
  label: string
  field: ConnectedField<string>
  placeholder?: string
  isRequired?: boolean
  mask?: string
  inputMode?: InputProps['inputMode']
}

export const TextField = ({ label, placeholder, isRequired, mask, inputMode, field }: Props) => {
  return (
    <Field.Root invalid={field.hasError()} required={isRequired}>
      <Field.Label fontWeight="semibold">
        {label} <FieldRequiredIndicator />
      </Field.Label>
      <Input
        fontSize={16}
        placeholder={placeholder}
        width="100%"
        value={field.value}
        onChange={(e) => field.onChange(e.target.value)}
        ref={mask ? withMask(mask) : undefined}
        inputMode={inputMode}
      />
      <Field.ErrorText>{field.firstError?.errorText}</Field.ErrorText>
    </Field.Root>
  )
}
