import React from 'react'
import Action from './Action'

export default function GradesControl({ grades, onDelete, onPersist }) {
  const tablesGrades = []

  let currentStudent = grades[0].student
  let currentSubject = grades[0].subject
  let currentGrades = []
  let id = 1

  grades.forEach((grade) => {
    if (grade.subject !== currentSubject) {
      tablesGrades.push({
        id: id++,
        student: currentStudent,
        subject: currentSubject,
        grades: currentGrades,
      })
      currentSubject = grade.subject
      currentGrades = []
    }

    if (grade.student !== currentStudent) {
      currentStudent = grade.student
    }

    currentGrades.push(grade)
  })

  //Inserir último elemento após o loop
  tablesGrades.push({
    id: id++,
    student: currentStudent,
    subject: currentSubject,
    grades: currentGrades,
  })

  const handleActionClick = (id, type) => {
    if (type === 'delete') {
      onDelete(id)
    } else {
      const grade = grades.find((grade) => grade.id === id)
      onPersist(grade)
    }
  }

  return (
    <div className='container'>
      {tablesGrades.map(({ id, grades }) => {
        const finalGrade = grades.reduce((acc, cur) => acc + cur.value, 0)
        const gradeStyle = finalGrade >= 70 ? style.goodGrade : style.badGrade
        return (
          <table className='striped' key={id} style={style.table}>
            <thead>
              <tr>
                <th style={{ width: '20%' }}>Students</th>
                <th style={{ width: '20%' }}>Subjects</th>
                <th style={{ width: '20%' }}>Type</th>
                <th style={{ width: '20%' }}>Grade</th>
                <th style={{ width: '20%' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {grades.map(
                ({ id, subject, student, type, value, isDeleted }) => {
                  return (
                    <tr key={id}>
                      <td>{student}</td>
                      <td>{subject}</td>
                      <td>{type}</td>
                      <td>{isDeleted ? '-' : value}</td>
                      <td>
                        <div>
                          <Action
                            onActionClick={handleActionClick}
                            id={id}
                            type={isDeleted ? 'add' : 'edit'}
                          />

                          {!isDeleted && (
                            <Action
                              onActionClick={handleActionClick}
                              id={id}
                              type='delete'
                            />
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                }
              )}
            </tbody>
            <tfoot>
              <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td style={{ textAlign: 'right' }}>
                  <strong>Total:</strong>
                </td>
                <td>
                  <span style={gradeStyle}>{finalGrade}</span>
                </td>
              </tr>
            </tfoot>
          </table>
        )
      })}
    </div>
  )
}

const style = {
  goodGrade: {
    fontWeight: 'bold',
    color: 'green',
  },
  badGrade: {
    fontWeight: 'bold',
    color: 'red',
  },
  table: {
    margin: '20px',
    padding: '10px',
  },
}
