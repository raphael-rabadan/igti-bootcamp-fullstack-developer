import React from 'react'
import Task from './Task'

export default function Tasks({ tasks, taskWasClicked }) {
  let actualDay = -1

  const handleTaskClick = (data) => {
    taskWasClicked(data)
  }

  return (
    <div>
      {tasks.map((task) => {
        if (task.day === actualDay) {
          return (
            <Task key={task.id} task={task} onTaskClick={handleTaskClick} />
          )
        } else {
          actualDay = task.day
          return (
            <span key={task.id}>
              <hr />
              <Task task={task} onTaskClick={handleTaskClick} />
            </span>
          )
        }
      })}
    </div>
  )
}
