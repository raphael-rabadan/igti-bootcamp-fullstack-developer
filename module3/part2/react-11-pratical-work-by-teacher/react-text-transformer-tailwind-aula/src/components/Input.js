import React, { Component } from 'react';

import { GrCopy as CopyIcon } from 'react-icons/gr';

export default class Input extends Component {
  handleInputChange = ({ currentTarget }) => {
    this.props.onTextChange(currentTarget.value);
  };

  handleCopy = () => {
    const copyText = document.getElementById(this.props.id);

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    document.execCommand('copy');
  };

  render() {
    const {
      autoFocus,
      readOnly,
      allowCopy,
      description = 'Descrição do label',
      inputValue,
      id,
      //onTextChange,
      //...otherProps
    } = this.props;

    return (
      <div className="flex flex-col p-4 space-y-1">
        <label htmlFor={id} className="text-sm text-gray-400">
          {description}
        </label>

        <div className="flex flex-row items-center justify-between space-x-2">
          <input
            id={id}
            autoFocus={autoFocus}
            type="text"
            className="border-b-2 w-full"
            value={inputValue}
            onChange={this.handleInputChange}
            readOnly={readOnly}
          />

          {allowCopy && (
            <button>
              <CopyIcon onClick={this.handleCopy} size="24" />
            </button>
          )}
        </div>
      </div>
    );
  }
}
