import React, { Component } from 'react';

export default class Transformations extends Component {
  render() {
    const { children } = this.props;
    return <div>{children}</div>;
  }
}
