import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import Modal from 'react-modal'
import M from 'materialize-css'
import Competences from './components/Competences'
import api from './api/apiService'

Modal.setAppElement('#root')

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    width: '800px',
    transform: 'translate(-50%, -50%)',
  },
}

const defaultItem = {
  _id: null,
  description: '',
  value: '',
  category: '',
  year: '',
  month: '',
  day: '',
  yearMonth: '',
  yearMonthDay: '',
  type: '-',
}

export default function App() {
  // state = {
  //   value: new Date(),
  //   format: 'ddd d, mmm',
  //   formatMoment: 'ddd D, MMM',
  // }

  useEffect(() => {
    M.AutoInit()
  }, [])

  const defaultCompetence = '2021-03'
  const [selectedCompetence, setSelectedCompetence] = useState(
    defaultCompetence
  )
  const [transactions, setTransactions] = useState([])
  const [transactionsOriginal, setTransactionsOriginal] = useState([])
  const [income, setIncome] = useState()
  const [expense, setExpense] = useState()
  const [balance, setBalance] = useState()
  const [editedItem, setEditedItem] = useState(Object.assign({}, defaultItem))

  const selectedCompetenceWasUpdated = (newCompetence) => {
    setSelectedCompetence(newCompetence)
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setEditedItem({ ...editedItem, [name]: value })
  }

  useEffect(() => {
    const getAllTransactions = async () => {
      const transactions = await api.getTransactionsByCompetence(
        selectedCompetence
      )
      setTransactions(Object.assign([], transactions))
      setTransactionsOriginal(Object.assign([], transactions))
    }
    getAllTransactions()
  }, [selectedCompetence])

  useEffect(() => {
    let income = 0
    let expense = 0
    transactions.forEach(({ type, value }) => {
      if (type === '+') {
        income += value
      } else if (type === '-') {
        expense += value
      }
    })
    setIncome(income)
    setExpense(expense)
    setBalance(income - expense)
  }, [transactions])

  var subtitle
  const [modalIsOpen, setIsOpen] = React.useState(false)
  function openModal() {
    setIsOpen(true)
  }

  function openModalForUpdate(obj) {
    setEditedItem(obj)
    openModal()
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = 'gray'
  }

  function closeModal() {
    setIsOpen(false)
    setEditedItem(Object.assign({}, defaultItem))
  }

  async function saveModal() {
    console.log(editedItem)
    const date = editedItem.yearMonthDay.split('-')
    const year = date[0]
    const month = date[1]
    const day = date[2]

    const objToBeSaved = Object.assign({}, editedItem)

    objToBeSaved.month = month
    objToBeSaved.year = year
    objToBeSaved.day = day
    objToBeSaved.yearMonth = `${year}-${month}`
    console.log(objToBeSaved)
    setIsOpen(false)
    setEditedItem(Object.assign({}, defaultItem))
    if (objToBeSaved._id) {
      await api.update(objToBeSaved._id, objToBeSaved)
    } else {
      await api.create(objToBeSaved)
    }

    const transactions = await api.getTransactionsByCompetence(
      selectedCompetence
    )
    setTransactions(Object.assign([], transactions))
  }

  const deleteTransaction = async (id) => {
    console.log(id)
    await api.remove(id)

    const transactions = await api.getTransactionsByCompetence(
      selectedCompetence
    )
    setTransactions(Object.assign([], transactions))
  }

  const filterTransactions = (event) => {
    const filteredTransactions = transactionsOriginal.filter((transaction) => {
      const transactionDesc = transaction.description.trim()
      const typed = event.target.value.trim()
      if (transactionDesc.includes(typed)) {
        return true
      }
      return false
    })
    setTransactions(filteredTransactions)
  }

  return (
    <div className='container center'>
      <h3>Desafio Final do Bootcamp Full Stack</h3>
      <div className='row'>
        <div className='col s12 center'>
          <h5>Controle Financeiro Pessoal - {selectedCompetence}</h5>
        </div>
      </div>
      <div className='row'>
        <div className='col s12 center'>
          <Competences
            selectedCompetence={selectedCompetence}
            defaultCompetence={defaultCompetence}
            onUpdate={selectedCompetenceWasUpdated}
          />
        </div>
      </div>
      <div className='row'>
        <div className='col s3 '>Lançamentos: {transactions.length}</div>
        <div className='col s3 '>Receitas: {income}</div>
        <div className='col s3 '>Despesas: {expense}</div>
        <div className='col s3 '>Saldo: {balance}</div>
      </div>
      <div className='row'>
        <div className='col s12 '>
          <input
            id='filtrar'
            name='filtrar'
            type='text'
            onChange={filterTransactions}
          />
          <label htmlFor='filtrar'>Filtrar</label>
        </div>
      </div>
      <div className='row'>
        <button onClick={openModal}>Novo</button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel='Example Modal'
        >
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Novo Lançamento</h2>
          <div className='row'>
            <div className='input-field col s12'>
              {editedItem.type}
              <p>
                <label>
                  <input
                    name='type'
                    type='radio'
                    value='-'
                    onChange={handleInputChange}
                  />
                  <span>Despesa</span>
                </label>
              </p>
              <p>
                <label>
                  <input
                    name='type'
                    type='radio'
                    value='+'
                    onChange={handleInputChange}
                  />
                  <span>Receita</span>
                </label>
              </p>
            </div>
          </div>
          <div className='row'>
            <div className='input-field col s12'>
              <input
                id='description'
                name='description'
                type='text'
                value={editedItem.description}
                onChange={handleInputChange}
              />
              <label htmlFor='description'>Descrição</label>
            </div>
          </div>
          <div className='row'>
            <div className='input-field col s12'>
              <input
                id='category'
                name='category'
                type='text'
                value={editedItem.category}
                onChange={handleInputChange}
              />
              <label htmlFor='category'>Categoria</label>
            </div>
          </div>
          <div className='row'>
            <div className='input-field col s12'>
              <input
                id='value'
                name='value'
                type='number'
                value={editedItem.value}
                onChange={handleInputChange}
              />
              <label htmlFor='value'>Valor</label>
            </div>
          </div>
          <div className='row'>
            <div className='input-field col s12'>
              <input
                id='yearMonthDay'
                type='text'
                name='yearMonthDay'
                className='datepicker dateset'
                value={editedItem.yearMonthDay}
                onChange={handleInputChange}
              />
              <label htmlFor='yearMonthDay'>Data</label>
            </div>
          </div>
          <button onClick={closeModal}>Close</button>
          <button onClick={saveModal}>Save</button>
        </Modal>
        <div className='col s12 '>Lançamentos:</div>
      </div>
      {transactions.map((transaction) => {
        let classes = 'row red'
        if (transaction.type === '+') {
          classes = 'row blue'
        }
        return (
          <div className={classes} key={transaction._id}>
            <div className='col s10 '>
              {transaction.day} - {transaction.description}(
              {transaction.category}) {`=>`} R$ {transaction.value}
            </div>
            <div className='col s2 '>
              <button onClick={() => deleteTransaction(transaction._id)}>
                {' '}
                X{' '}
              </button>
              &nbsp;&nbsp;&nbsp;
              <button onClick={() => openModalForUpdate(transaction)}>
                {' '}
                [ ]{' '}
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
