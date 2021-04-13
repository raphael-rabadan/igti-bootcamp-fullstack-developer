import React from 'react'

export default function Task({ task }) {
  console.log(task)

  const cssColor = task.done ? 'card green' : 'card orange'

  return (
    <div className={cssColor} style={{ padding: '10px', margin: '15px' }}>
      <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
        {task.date.split('-').reverse().join('/')}
      </span>
      &nbsp; - &nbsp;
      {task.description}
    </div>
  )
}

const styles = {
  done: {},
}
