import { sample } from 'effector'
import { $selectedAdditionalOptions, baseInfoForm, nextStep, toggleAdditionalOption } from './private'

$selectedAdditionalOptions.on(toggleAdditionalOption, (state, { groupId, optionId }) => {
  const newState = { ...state }
  const group = newState[groupId] || []
  const exists = group.includes(optionId)
  let nextGroup: string[]
  if (exists) {
    nextGroup = group.filter((id) => id !== optionId)
    const removeSubThree = (id: string) => {
      if (newState[id]) {
        newState[id].forEach(removeSubThree)
        delete newState[id]
      }
    }
    group.forEach(removeSubThree)
  } else {
    nextGroup = [...group, optionId]
  }
  if (nextGroup.length === 0) {
    delete newState[groupId]
    return newState
  }
  return { ...newState, [groupId]: nextGroup }
})

sample({
  clock: baseInfoForm.formValidated,
  target: nextStep
})
