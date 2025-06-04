export const rules = {
  required: (errorText?: string) => ({
    name: 'required',
    validator: (value: string | number | Date | null) => {
      if (typeof value === 'string') return Boolean(value.trim())
      else return Boolean(value)
    },
    errorText: errorText || 'field is required'
  })
}
