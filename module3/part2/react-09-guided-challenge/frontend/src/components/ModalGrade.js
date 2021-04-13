import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'

import * as api from '../api/apiServices'

Modal.setAppElement('#root')

export default function ModalGrade({ onSave, onClose, selectedGrade }) {
  const [gradeValue, setGradeValue] = useState(selectedGrade.value)
  const [gradeValidation, setGradeValidation] = useState({})
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const validation = api.getValidationFromGradeType(selectedGrade.type)
    setGradeValidation(validation)
  }, [selectedGrade.type])

  useEffect(() => {
    const { minValue, maxValue } = gradeValidation
    if (gradeValue < minValue || gradeValue > maxValue) {
      setErrorMessage(
        `O valor da nota deve ser entre ${minValue} e ${maxValue} (inclusive)`
      )
      return
    }

    setErrorMessage('')
  }, [gradeValue, gradeValidation])

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      onClose(null)
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  })

  const handleFormSubmit = () => {}

  return (
    <div>
      <Modal isOpen={true}>
        <form onSubmit={handleFormSubmit}></form>{' '}
        <div className='input-field'>
          <input id='inputName' type='text' value={student} readOnly />
          <label className='active' htmlFor='inputName'>
            Nome do aluno:
          </label>
        </div>
      </Modal>
    </div>
  )
}
