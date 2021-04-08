import React from 'react'
import Candidate from './Candidate'
import Card from './Card'

export default function Candidates({ candidates }) {
  return (
    <ul>
      {candidates.map((candidate, i) => {
        const { id } = candidate

        return (
          <Card key={id}>
            <Candidate candidate={candidate} position={i + 1} />
          </Card>
        )
      })}
    </ul>
  )
}
