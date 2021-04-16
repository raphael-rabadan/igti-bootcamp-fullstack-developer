import React from 'react';
import * as stringHelpers from '../helpers/stringHelpers';

export default function Todo({ children: todo, onClick, differentDay }) {
  const { day, month, year, description, done } = todo;

  const { todoStyle, dayStyle, descriptionStyle } = styles;
  const backgroundColor = done ? '#b8e994' : '#f8c291';

  function handleTodoClick() {
    onClick(todo);
  }

  // prettier-ignore
  const date = 
    `${stringHelpers.formatDayMonth(day)}/${stringHelpers.formatDayMonth(month)}/${year}`;

  return (
    <div>
      <div className="row" style={{ marginBottom: '0' }}>
        <div className="col s12">
          <div
            className="card-panel horizontal"
            style={{ flex: 1, backgroundColor }}
            onClick={handleTodoClick}
          >
            <div className="card-stacked">
              <div className="card-content" style={todoStyle}>
                <span style={dayStyle}>{date}</span>
                <span style={descriptionStyle}>{description}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {differentDay && <hr />}
    </div>
  );
}

const styles = {
  todoStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    cursor: 'pointer',
  },

  dayStyle: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginRight: '20px',
  },

  descriptionStyle: {
    fontSize: '1.6rem',
  },
};
