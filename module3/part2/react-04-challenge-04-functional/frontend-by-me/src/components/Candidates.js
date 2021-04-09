import React from 'react'
import Candidate from './Candidate'
import Card from './Card'
import FlipMove from 'react-flip-move'

export default function Candidates({
  candidates,
  previousVotes,
  previousPercentages,
}) {
  return (
    <div>
      <FlipMove>
        {candidates.map((candidate, i) => {
          const { id } = candidate

          const previousVoteObject = previousVotes.find(
            (item) => item.id === id
          )
          const previousVote = !!previousVoteObject
            ? previousVoteObject.votes
            : 0

          const previousPercentageObject = previousPercentages.find(
            (item) => item.id === id
          )

          const previousPercentage = !!previousPercentageObject
            ? previousPercentageObject.percentage
            : 0

          return (
            <div key={id}>
              <Card>
                <Candidate
                  previousPercentage={previousPercentage}
                  previousVote={previousVote}
                  candidate={candidate}
                  position={i + 1}
                />
              </Card>
            </div>
          )
        })}
      </FlipMove>
    </div>
  )
}
