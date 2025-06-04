import { createDomain } from 'effector'
import { createForm } from 'effector-forms'
import { rules } from '@/lib/validators'

const d = createDomain('calc')

export enum PlumbingType {
  Vertical = 'Вертикальная',
  Collector = 'Коллекторная горизонтальная',
  Standpipe = 'Стояковая с байпасами',
  Other = 'Другое'
}

export interface BaseInfoFormFields {
  area: string
  floors: string
  sections: string
  apartments: string
  plumbingType: PlumbingType
}

export const baseInfoForm = createForm<BaseInfoFormFields>({
  domain: d,
  fields: {
    area: {
      init: '',
      rules: [rules.required('Общая жилая (продаваемая) площадь обязательна')]
    },
    floors: {
      init: '',
      rules: [rules.required('Количество этажей обязательно')]
    },
    sections: {
      init: '',
      rules: [rules.required('Количество секций обязательно')]
    },
    apartments: {
      init: '',
      rules: [rules.required('Количество квартир обязательно')]
    },
    plumbingType: {
      init: PlumbingType.Vertical,
      rules: [rules.required('Тип разводки ХВС/ГВС обязателен')]
    }
  }
})
