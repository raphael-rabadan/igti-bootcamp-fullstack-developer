import React from 'react'

export default function Task({ task, onTaskClick }) {
  let cssColor = task.done
    ? '#a5d6a7 green lighten-3'
    : '#ffab91 deep-orange lighten-3'

  const handleTaskClick = () => {
    onTaskClick(task)
  }

  return (
    <div
      className={cssColor}
      style={{
        padding: '15px',
        margin: '20px',
        cursor: 'pointer',
      }}
      onClick={handleTaskClick}
    >
      <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
        {task.date.split('-').reverse().join('/')}
      </span>
      &nbsp; - &nbsp;
      {task.description}
    </div>
  )
}
