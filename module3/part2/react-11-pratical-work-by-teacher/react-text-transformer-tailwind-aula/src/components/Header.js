import React, { Component } from 'react';

export default class Header extends Component {
  render() {
    const { children, className } = this.props;

    return (
      <header>
        <div className={`bg-gray-100 mx-auto p-4 ${className}`}>
          <h1 className="text-center font-semibold text-xl">{children}</h1>
        </div>
      </header>
    );
  }
}
