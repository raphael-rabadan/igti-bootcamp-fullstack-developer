import React, { useState, useEffect } from 'react'
import Candidates from './components/Candidates'
import Header from './components/Header'
import Spinner from './components/Spinner'

export default function App() {
  const [candidates, setCandidates] = useState([])
  const [previousVotes, setPreviousVotes] = useState([])
  const [previousPercentages, setPreviousPercentages] = useState([])

  useEffect(() => {
    const interval = setInterval(() => {
      fetch('http://localhost:8080/votes')
        .then((res) => {
          return res.json()
        })
        .then((json) => {
          const newPreviousVotes = candidates.map(({ id, votes }) => {
            return { id, votes }
          })

          const newPreviousPercentages = candidates.map(
            ({ id, percentage }) => {
              return { id, percentage }
            }
          )

          setCandidates(json.candidates)
          setPreviousVotes(newPreviousVotes)
          setPreviousPercentages(newPreviousPercentages)
        })
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [candidates])

  if (candidates.length === 0) {
    return <Spinner description='Loading...' />
  }
  return (
    <div className='container'>
      <Header>Votes</Header>
      <Candidates
        previousPercentages={previousPercentages}
        previousVotes={previousVotes}
        candidates={candidates}
      ></Candidates>
    </div>
  )
}
