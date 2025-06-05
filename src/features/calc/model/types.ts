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

export interface Prices {
  area: number
  floors: number
  sections: number
  apartments: number
  plumbingType: Record<PlumbingType, number>
}

export interface ServiceOption {
  id: string
  label: string
  price: number
  subOptions?: ServiceOption[]
}

export interface AdditionalService {
  id: string
  label: string
  options: ServiceOption[]
}

export interface GroupItem {
  id: string
  label: string
  itemPrice: number
  groupTotal: number
  subGroups?: GroupItem[] | undefined
}
