export const rules = {
  required: (errorText?: string) => ({
    name: 'required',
    validator: (value: string | number | Date | null) => {
      if (typeof value === 'string') return Boolean(value.trim())
      else return Boolean(value)
    },
    errorText: errorText || 'field is required'
  }),
  email: () => ({
    name: 'email',
    validator: (value: string) => {
      if (!value) return true
      return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)
    },
    errorText: 'Невалидный email'
  }),
  phone: () => ({
    name: 'phone',
    validator: (value: string) => {
      if (!value) return true
      const digits = value.replace(/\D/g, '')
      return /^([78])\d{10}$/.test(digits)
    },
    errorText: 'Невалидный номер телефона'
  })
}
