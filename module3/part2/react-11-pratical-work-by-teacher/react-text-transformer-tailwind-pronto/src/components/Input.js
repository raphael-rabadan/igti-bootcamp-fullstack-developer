import React, { Component } from 'react';

import { AiOutlineCopy as CopyIcon } from 'react-icons/ai';

import { v4 as uuid } from 'uuid';

export default class Input extends Component {
  handleInputChange = ({ currentTarget }) => {
    const text = currentTarget.value;

    if (this.props.onChange) {
      this.props.onChange(text);
    }
  };

  handleCopy = () => {
    const element = document.getElementById(this.props.id);
    console.log(element);

    /* Select the text field */
    element.select();
    element.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    document.execCommand('copy');
  };

  render() {
    const {
      id = uuid(),
      allowCopy = false,
      autoFocus = false,
      description = 'Descrição do label do input:',
      readOnly = false,
      className = '',
      value = '',
    } = this.props;

    return (
      <div className={`flex flex-col ${className}`}>
        <label htmlFor={id} className="text-xs text-gray-400 mb-1">
          {description}
        </label>

        <div className="flex flex-row items-center justify-between space-x-2">
          <input
            id={id}
            className="p-2 border-b-2 border-gray-400 w-full"
            autoFocus={autoFocus}
            type="text"
            value={value}
            onChange={this.handleInputChange}
            readOnly={readOnly}
          />

          {allowCopy && (
            <CopyIcon
              className="cursor-pointer"
              onClick={this.handleCopy}
              size="24"
            />
          )}
        </div>
      </div>
    );
  }
}
