import { sample } from 'effector'
import { $selectedAdditionalOptions, baseInfoForm, nextStep, toggleAdditionalOption } from './private'

$selectedAdditionalOptions.on(toggleAdditionalOption, (state, { groupId, optionId }) => {
  const newState = { ...state }
  const group = newState[groupId] || []
  const exists = group.includes(optionId)

  const removeSubTree = (id: string) => {
    if (newState[id]) {
      newState[id].forEach(removeSubTree)
      delete newState[id]
    }
  }

  let nextGroup: string[]
  if (exists) {
    removeSubTree(optionId)
    nextGroup = group.filter((id) => id !== optionId)
  } else {
    nextGroup = [...group, optionId]
  }

  if (nextGroup.length === 0) {
    const { [groupId]: _, ...rest } = newState
    return rest
  }
  return { ...newState, [groupId]: nextGroup }
})

sample({
  clock: baseInfoForm.formValidated,
  target: nextStep
})
