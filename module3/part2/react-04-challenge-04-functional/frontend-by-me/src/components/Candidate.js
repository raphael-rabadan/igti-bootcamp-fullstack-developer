import React from 'react'
import Info from './Info'
import Name from './Name'
import Percentage from './Percentage'
import Picture from './Picture'
import Position from './Position'
import Votes from './Votes'
import Popularity from './Popularity'

import css from './candidate.module.css'

export default function Candidate({
  previousVote,
  candidate,
  position,
  previousPercentage,
}) {
  const { id, name, votes, percentage, popularity } = candidate
  return (
    <div className={css.flexRow}>
      <Position>{position}</Position>
      <Picture imageSource={`${id}.jpg`} description={name} />
      <Info>
        <Name>{name}</Name>
        <Votes value={votes} previous={previousVote}></Votes>
        <Percentage
          value={percentage}
          previous={previousPercentage}
        ></Percentage>
        <Popularity value={popularity} />
      </Info>
    </div>
  )
}
