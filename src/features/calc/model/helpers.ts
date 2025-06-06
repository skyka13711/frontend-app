import { AdditionalService, PlumbingType, ServiceOption } from './types'

/**
 * Фильтрует опции сервиса по типу сантехники
 * @param option - Опция сервиса для фильтрации
 * @param plumbingType - Тип сантехники для фильтрации
 * @returns Отфильтрованная опция или null если не подходит
 */
const filterOptionsByPlumbing = (option: ServiceOption, plumbingType: PlumbingType): ServiceOption | null => {
  if (option.plumbingType && option.plumbingType !== plumbingType) {
    return null
  }

  return {
    ...option,
    subOptions: option.subOptions
      ? option.subOptions
          .map((subOption) => filterOptionsByPlumbing(subOption, plumbingType))
          .filter((item): item is ServiceOption => item !== null)
      : undefined
  }
}

/**
 * Возвращает сервисы, видимые для указанного типа сантехники
 * @param services - Массив всех доступных сервисов
 * @param plumbingType - Тип сантехники для фильтрации
 * @returns Отфильтрованный массив сервисов
 */
export const getVisibleServices = (services: AdditionalService[], plumbingType: PlumbingType): AdditionalService[] => {
  return services
    .map((service) => ({
      ...service,
      options: service.options
        .map((option) => filterOptionsByPlumbing(option, plumbingType))
        .filter((option): option is ServiceOption => option !== null)
    }))
    .filter((service) => service.options.length > 0)
}

/**
 * Создает карту опций для быстрого поиска
 * @param services - Массив сервисов
 * @returns Объект-карта с опциями по ID
 */
export const createOptionsMap = (services: AdditionalService[]): Record<string, ServiceOption> => {
  const map: Record<string, ServiceOption> = {}

  const mapSubOptions = (options: ServiceOption[]) => {
    options.forEach((option) => {
      map[option.id] = option
      if (option.subOptions) {
        mapSubOptions(option.subOptions)
      }
    })
  }

  services.forEach((service) => mapSubOptions(service.options))
  return map
}
