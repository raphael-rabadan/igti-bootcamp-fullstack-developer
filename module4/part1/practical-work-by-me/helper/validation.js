const validateStringField = (fieldValue, fieldText) => {
  if (
    fieldValue === undefined ||
    fieldValue === null ||
    !fieldValue ||
    fieldValue.trim() === ''
  ) {
    throw new Error(`O campo ${fieldText} é obrigatório.`)
  }
  return true
}
const validateNumberField = (fieldValue, fieldText) => {
  if (
    fieldValue === undefined ||
    fieldValue === null ||
    !fieldValue ||
    typeof fieldValue !== 'number' ||
    Number.isNaN(parseInt(fieldValue))
  ) {
    throw new Error(`O campo ${fieldText} é obrigatório.`)
  }
  return true
}

export default { validateStringField, validateNumberField }
