import React from 'react'
import Task from './Task'

export default function Tasks({ tasks }) {
  let actualDay = -1

  return (
    <div>
      {tasks.map((task) => {
        if (task.day === actualDay) {
          return <Task key={task.id} task={task} />
        } else {
          actualDay = task.day
          return (
            <span key={task.id}>
              <hr />
              <Task task={task} />
            </span>
          )
        }
      })}
    </div>
  )
}
