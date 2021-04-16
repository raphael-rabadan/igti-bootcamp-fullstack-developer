import React, { Component } from 'react';
import Input from './Input';

export default class Transformation extends Component {
  render() {
    const { description, value, id } = this.props;

    return (
      <Input
        readOnly
        allowCopy
        id={id}
        description={description}
        value={value}
      />
    );
  }
}
