import React, { Component } from 'react';

export default class Main extends Component {
  render() {
    const { children } = this.props;

    return <main className="p-4">{children}</main>;
  }
}
