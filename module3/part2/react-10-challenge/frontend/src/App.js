import React, { useState, useEffect } from 'react'
import * as api from './api/apiService'
import ButtonContainer from './components/ButtonContainer'
import Tasks from './components/Tasks'

export default function App() {
  const [allTasks, setAllTasks] = useState([])
  const [filteredTasks, setFilteredTasks] = useState([])
  const [allYears, setAllYears] = useState([])
  const [allMonths, setAllMonths] = useState([])
  const [selectedMonth, setSelectedMonth] = useState(null)
  const [selectedYear, setSelectedYear] = useState(null)

  useEffect(() => {
    const getAllActivities = async () => {
      const data = await api.getAllActivities()
      setAllTasks(Object.assign([], data.data))

      let sortedArray = Object.assign([], data.data)
      sortedArray = sortedArray.sort((a, b) => a.day - b.day)
      sortedArray = sortedArray.sort((a, b) => a.month - b.month)
      sortedArray = sortedArray.sort((a, b) => a.year - b.year)

      setFilteredTasks(sortedArray)
    }
    getAllActivities()
  }, [])

  useEffect(() => {
    const getMonthsAndYears = async () => {
      const uniqueAllYears = new Set()
      const uniqueAllMonths = new Set()
      allTasks.forEach((activity) => {
        uniqueAllYears.add(activity.year)
        uniqueAllMonths.add(activity.month)
      })

      const arrayMonthsOrganized = Array.from(uniqueAllMonths)
        .sort((a, b) => a - b)
        .map((month) => getMonthAbbreviationFromId(month))

      setAllMonths(arrayMonthsOrganized)
      setAllYears(Array.from(uniqueAllYears).sort((a, b) => a - b))
    }
    getMonthsAndYears()
  }, [allTasks])

  useEffect(() => {
    const tasksByYear = allTasks.filter((task) => {
      if (selectedYear !== null) {
        return task.year === selectedYear
      }
      return true
    })
    const tasksByMonth = tasksByYear.filter((task) => {
      if (selectedMonth !== null) {
        return task.month === getMonthIdFromAbbreviation(selectedMonth)
      }
      return true
    })

    let sortedArray = Object.assign([], tasksByMonth)
    sortedArray = sortedArray.sort((a, b) => a.day - b.day)
    sortedArray = sortedArray.sort((a, b) => a.month - b.month)
    sortedArray = sortedArray.sort((a, b) => a.year - b.year)

    setFilteredTasks(sortedArray)
  }, [selectedYear, selectedMonth])

  const handleOnButtonClick = (data, type) => {
    if (type === 'month') {
      setSelectedMonth(data)
    } else if (type === 'year') {
      setSelectedYear(data)
    }
  }

  return (
    <div className='container'>
      <h3 className='center'>React Todos</h3>
      <br />
      Total: {filteredTasks.length}
      <br />
      Done: {filteredTasks.filter((task) => task.done === true).length}
      <br />
      To do: {filteredTasks.filter((task) => task.done !== true).length}
      <br />
      <ButtonContainer
        values={allYears}
        selected={selectedYear}
        type='year'
        onButtonClick={handleOnButtonClick}
      />
      <ButtonContainer
        values={allMonths}
        selected={selectedMonth}
        type='month'
        onButtonClick={handleOnButtonClick}
      />
      <hr />
      <Tasks tasks={filteredTasks} />
    </div>
  )
}

const objMonths = [
  {
    id: 1,
    abbreviation: 'JAN',
    name: 'January',
  },
  {
    id: 2,
    abbreviation: 'FEB',
    name: 'February',
  },
  {
    id: 3,
    abbreviation: 'MAR',
    name: 'March',
  },
  {
    id: 4,
    abbreviation: 'APR',
    name: 'April',
  },
  {
    id: 5,
    abbreviation: 'MAY',
    name: 'May',
  },
  {
    id: 6,
    abbreviation: 'JUN',
    name: 'June',
  },
  {
    id: 7,
    abbreviation: 'JUL',
    name: 'July',
  },
  {
    id: 8,
    abbreviation: 'AUG',
    name: 'August',
  },
  {
    id: 9,
    abbreviation: 'SEP',
    name: 'September',
  },
  {
    id: 10,
    abbreviation: 'OCT',
    name: 'October',
  },
  {
    id: 11,
    abbreviation: 'NOV',
    name: 'November',
  },
  {
    id: 12,
    abbreviation: 'DEC',
    name: 'December',
  },
]

const getMonthIdFromAbbreviation = (abbreviation) => {
  return objMonths.find((month) => abbreviation === month.abbreviation).id
}
const getMonthAbbreviationFromId = (id) => {
  return objMonths.find((month) => id === month.id).abbreviation
}
