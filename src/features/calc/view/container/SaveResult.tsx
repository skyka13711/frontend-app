import { memo } from 'react'
import { LuFileSpreadsheet, LuFileText, LuMail, LuPhone } from 'react-icons/lu'
import { Button } from '@chakra-ui/react'

import { FormLayout } from '../parts'
import { setStep } from '../../model/private'
import { Step } from '../../model/types'

export const SaveResult = memo(() => {
  return (
    <FormLayout
      onGoBack={() => setStep(Step.Total)}
      title="Сохранить"
      buttonLabel="Связь с отделом продаж"
      onButtonClick={() => setStep(Step.Contact)}
      buttonIcon={<LuPhone />}
      gap={5}
    >
      <Button onClick={() => setStep(Step.SendToEmail)} size="xl" colorPalette="gray" variant="subtle">
        <LuMail />
        Отправить на почту
      </Button>
      <Button size="xl" colorPalette="gray" variant="subtle">
        <LuFileText />
        Сохранить в PDF
      </Button>
      <Button size="xl" colorPalette="gray" variant="subtle">
        <LuFileSpreadsheet />
        Сохранить в EXCEL
      </Button>
    </FormLayout>
  )
})
