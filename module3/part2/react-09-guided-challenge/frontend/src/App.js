import React, { useState, useEffect } from 'react'
import * as api from './api/apiServices'
import GradesControl from './components/GradesControl'
import ModalGrade from './components/ModalGrade'
import Spinner from './components/Spinner'

export default function App() {
  const [allGrades, setAllGrades] = useState([])
  const [selectedGrade, setSelectedGrade] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const getGrades = async () => {
      const grades = await api.getAllGrades()
      setAllGrades(grades)
    }
    setTimeout(getGrades, 1000)
  }, [])

  const handleDelete = async (id) => {
    const isDeleted = await api.deleteGrade(id)
    if (isDeleted) {
      const deletedGradeIndex = allGrades.findIndex((grade) => grade.id === id)

      const newGrades = Object.assign([], allGrades)
      newGrades[deletedGradeIndex].isDeleted = true
      newGrades[deletedGradeIndex].value = 0

      setAllGrades(newGrades)
    }
  }

  const handlePersist = (grade) => {
    setSelectedGrade(grade)
    setIsModalOpen(true)
  }

  const handlePersistData = async (formData) => {
    const { id, newValue } = formData
    const newGrades = Object.assign([], allGrades)

    const gradeToPersist = newGrades.find((grade) => grade.id === id)
    gradeToPersist.value = newValue

    if (gradeToPersist.isDeleted) {
      gradeToPersist.isDeleted = false
      await api.insertGrade(gradeToPersist)
    } else {
      await api.updateGrade(gradeToPersist)
    }

    setIsModalOpen(false)
  }

  const handleClose = () => {
    setIsModalOpen(false)
  }

  return (
    <div className='container'>
      <h1 className='center'>Grades Control</h1>
      {allGrades.length === 0 && <Spinner />}
      {allGrades.length > 0 && (
        <GradesControl
          grades={allGrades}
          onDelete={handleDelete}
          onPersist={handlePersist}
        />
      )}

      {isModalOpen && (
        <ModalGrade
          onSave={handlePersistData}
          onClose={handleClose}
          selectedGrade={selectedGrade}
        />
      )}
    </div>
  )
}
