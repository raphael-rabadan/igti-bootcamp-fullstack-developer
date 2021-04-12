import axios from 'axios'

const API_URL = 'http://localhost:3001/grade'
const GRADE_VALIDATION = [
  {
    id: 1,
    gradeType: 'Exercícios',
    minValue: 0,
    maxValue: 10,
  },
  {
    id: 2,
    gradeType: 'Trabalho Prático',
    minValue: 0,
    maxValue: 40,
  },
  {
    id: 3,
    gradeType: 'Desafio',
    minValue: 0,
    maxValue: 50,
  },
]

async function geAllGrades() {
  const res = await axios.get(API_URL)

  const grades = res.data.grades.map((grade) => {
    const { student, subject, type } = grade

    return {
      ...grade,
      studentLowerCase: student.toLowerCase(),
      subjectLowerCase: subject.toLowerCase(),
      typeLowerCase: type.toLowerCase(),
      isDeleted: false,
    }
  })

  let allStudents = new Set()
  let allSubjects = new Set()
  let allTypes = new Set()
  grades.forEach((grade) => {
    allStudents.add(grade.student)
    allSubjects.add(grade.subject)
    allTypes.add(grade.type)
  })

  allStudents = Array.from(allStudents)
  allSubjects = Array.from(allSubjects)
  allTypes = Array.from(allTypes)

  let maxId = -1
  grades.forEach(({ id }) => {
    if (id > maxId) {
      maxId = id
    }
  })
  let nextId = maxId + 1

  const allCombinations = []
  allStudents.forEach((student) => {
    allSubjects.forEach((subject) => {
      allTypes.forEach((type) => {
        allCombinations.push({
          student,
          subject,
          type,
        })
      })
    })
  })

  allCombinations.forEach(({ student, subject, type }) => {
    const hasItem = grades.find((grade) => {
      return (
        grade.subject === subject &&
        grade.student === student &&
        grade.type === type
      )
    })

    if (!hasItem) {
      grades.push({
        id: nextId++,
        student,
        studentLowerCase: student.toLowerCase(),
        subject,
        subjectLowerCase: subject.toLowerCase(),
        type,
        typeLowerCase: type.toLowerCase(),
        value: 0,
        isDeleted: true,
      })
    }
  })

  grades.sort((a, b) => a.typeLowerCase.localeCompare(b.typeLowerCase))
  grades.sort((a, b) => a.subjectLowerCase.localeCompare(b.subjectLowerCase))
  grades.sort((a, b) => a.studentLowerCase.localeCompare(b.studentLowerCase))

  return grades
}

const insertGrade = async (grade) => {
  const res = await axios.post(API_URL, grade)
  return res.data.id
}

async function updateGrade(grade) {
  const res = await axios.put(API_URL, grade)
  return res.data
}

async function deleteGrade(grade) {
  const res = await axios.delete(`${API_URL}/${grade.id}`)
  return res.data
}

async function getValidationFromGradeType(gradeType) {
  const gradeValidation = GRADE_VALIDATION.find(
    (item) => item.gradeType === gradeType
  )

  return {
    minValue: gradeValidation.minValue,
    maxValue: gradeValidation.maxValue,
  }
}

export {
  geAllGrades,
  insertGrade,
  updateGrade,
  deleteGrade,
  getValidationFromGradeType,
}
