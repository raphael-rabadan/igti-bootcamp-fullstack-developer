import React, { Component } from 'react';

export default class Input extends Component {
  handleInputChange = ({ target }) => {
    this.props.onChange(target.value);
  };

  handleCopyClick = ({ target }) => {
    const input = target.parentElement.children[0].children[0];
    input.select();
    document.execCommand('copy');
  };

  render() {
    const {
      autoFocus,
      readOnly,
      allowCopy,
      description,
      value,
      id,
    } = this.props;

    const { flexRowStyle, copyStyle } = styles;
    const inputId = `input_${id}`;

    return (
      <div style={flexRowStyle}>
        <div className="input-field" style={{ flex: 7 }}>
          <input
            autoFocus={autoFocus}
            id={inputId}
            type="text"
            readOnly={readOnly}
            value={value}
            onChange={this.handleInputChange}
          />
          <label htmlFor={inputId} className="active">
            {description}
          </label>
        </div>

        {allowCopy && (
          <span
            style={copyStyle}
            title="Copiar"
            alt="Copiar"
            className="material-icons"
            onClick={this.handleCopyClick}
          >
            content_copy
          </span>
        )}
      </div>
    );
  }
}

const styles = {
  flexRowStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },

  copyStyle: {
    cursor: 'pointer',
  },
};
