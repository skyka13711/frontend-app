import { AdditionalService, PlumbingType, Prices, ServiceOption } from './types'

export const pricesMock: Prices = {
  area: 950, // цена за 1 м²
  floors: 40000, // цена за 1 этаж
  sections: 25000, // цена за 1 секцию
  apartments: 12000, // цена за 1 квартиру
  plumbingType: {
    [PlumbingType.Vertical]: 85000,
    [PlumbingType.Collector]: 115000
  }
}

const subOptionsMock: ServiceOption[] = [
  {
    id: 'smart_meters_1',
    label: 'Умные счетчики',
    subOptions: [
      {
        id: 'smart_meters_1_1',
        label: 'Холодная вода',
        price: 3000
      },
      {
        id: 'smart_meters_1_2',
        label: 'Горячая вода',
        price: 4000
      },
      {
        id: 'smart_meters_1_3',
        label: 'Электроэнергия',
        price: 5000
      }
    ],
    price: 7000
  },
  {
    id: 'video_intercom_1',
    label: 'Домофония с видеопотоком',
    subOptions: [],
    price: 11000
  }
]

export const additionalServiceMock: AdditionalService[] = [
  {
    id: 'safety',
    label: 'Безопасность',
    options: [
      { id: 'smart_meters', label: 'Умные счетчики (ХВС, электроэнергия)', price: 7000 },
      { id: 'video_intercom', label: 'Домофония с видеопотоком', price: 11000, subOptions: subOptionsMock },
      { id: 'access_control', label: 'Контроль доступа (СКУД)', price: 14000 },
      { id: 'leak_alerts', label: 'Уведомления о протечках', price: 4500 }
    ]
  },
  {
    id: 'comfort',
    label: 'Комфорт',
    options: [
      { id: 'mobile_app', label: 'Мобильное приложение жителя', price: 20000 },
      { id: 'smart_scenarios', label: 'Сценарии "умного дома" в квартирах и др.', price: 15000 }
    ]
  },
  {
    id: 'engineering',
    label: 'Инженерные системы',
    options: [
      { id: 'itp_automation', label: 'Автоматизация ИТП', price: 50000 },
      { id: 'remote_heating', label: 'Удаленное управление отоплением', price: 18000 }
    ]
  }
]
