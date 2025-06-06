import { useUnit } from 'effector-react'
import { LuArrowRight } from 'react-icons/lu'

import {
  $selectedAdditionalOptions,
  $visibleServices,
  nextStep,
  prevStep,
  toggleAdditionalOption
} from '../../model/private'
import { FormLayout, ServiceItem } from '../parts'

export const SetupAdditionalService = () => {
  const services = useUnit($visibleServices)
  const handleToggle = useUnit(toggleAdditionalOption)
  const selectedOptions = useUnit($selectedAdditionalOptions)
  return (
    <FormLayout
      onGoBack={prevStep}
      title="Расчет стоимости АСУЗ"
      buttonLabel="Рассчитать"
      onButtonClick={nextStep}
      buttonIcon={<LuArrowRight />}
    >
      {services?.map(({ id, label, options }) => {
        return (
          <ServiceItem
            onToggle={handleToggle}
            options={options}
            selected={selectedOptions}
            title={label}
            key={id}
            groupId={id}
          />
        )
      })}
    </FormLayout>
  )
}
