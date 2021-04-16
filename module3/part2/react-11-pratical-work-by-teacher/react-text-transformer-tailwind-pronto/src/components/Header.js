import React, { Component } from 'react';

export default class Header extends Component {
  render() {
    const { children = 'Título do Header' } = this.props;

    return (
      <header className="bg-gray-100 p-4 text-center text-2xl font-semibold">
        {children}
      </header>
    );
  }
}
