const generateCompetences = () => {
  let competences = []
  for (let iYear = 2019; iYear < 2022; iYear++) {
    for (let iMonth = 1; iMonth < 13; iMonth++) {
      competences.push({
        month: iMonth.toString().length === 1 ? '0' + iMonth : iMonth,
        year: iYear,
      })
    }
  }
  return competences
}

export { generateCompetences }
