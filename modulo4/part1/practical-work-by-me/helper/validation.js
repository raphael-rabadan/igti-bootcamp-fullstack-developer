const validateStringField = (fieldValue, fieldText) => {
  if (
    fieldValue === undefined ||
    fieldValue === null ||
    !fieldValue ||
    fieldValue.trim() === ''
  ) {
    throw new Error(`O campo ${fieldText} é obrigatório.`)
  }
}
const validateNumberField = (fieldValue, fieldText) => {
  if (
    fieldValue === undefined ||
    fieldValue === null ||
    !fieldValue ||
    Number.isNaN(parseInt(fieldValue))
  ) {
    throw new Error(`O campo ${fieldText} é obrigatório.`)
  }
}

export default { validateStringField, validateNumberField }
