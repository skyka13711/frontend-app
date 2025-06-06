import { memo } from 'react'
import { LuMail } from 'react-icons/lu'
import { useForm } from 'effector-forms'

import { FormLayout, TextField } from '../parts'
import { sendToEmailForm, setStep } from '../../model/private'
import { Step } from '../../model/types'

export const SendToEmail = memo(() => {
  const { fields, submit } = useForm(sendToEmailForm)

  return (
    <FormLayout
      gap={5}
      buttonIcon={<LuMail />}
      buttonLabel="Отправить"
      onButtonClick={submit}
      title="Отправить на почту"
      onGoBack={() => setStep(Step.Save)}
    >
      <TextField label="Email" placeholder="Ваша почта" field={fields.email} isRequired={true} inputMode="email" />
      <TextField label="ФИО" placeholder="Как к вам обращаться" field={fields.fio} />
      <TextField label="Компания" field={fields.company} placeholder="Название компании" />
      <TextField placeholder="Ваша должность" field={fields.position} label="Должность" />
      <TextField
        placeholder="+7 (555) 555-55-55"
        label="Номер телефона"
        field={fields.phone}
        mask="+7 999 999-99-99"
        inputMode="tel"
      />
    </FormLayout>
  )
})
