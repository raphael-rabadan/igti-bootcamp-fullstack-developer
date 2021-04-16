import React, { Component } from 'react';

import Input from './components/Input';
import Transformations from './components/Transformations';
import Transformation from './components/Transformation';

import * as stringHelpers from './helpers/stringHelpers';

const MY_TRANSFORMATIONS = [
  {
    id: 't1',
    description: 'Texto invertido:',
    transformFunction: text => text.split('').reverse().join(''),
  },

  {
    id: 't2',
    description: 'Texto numérico:',
    transformFunction: text =>
      stringHelpers
        .removeSpecialCharacters(text)
        .toUpperCase()
        .split('')
        .map(char => {
          if (char === 'O') return '0';
          if (char === 'A') return '4';
          if (char === 'E') return '3';
          if (char === 'I') return '1';
          if (char === 'S') return '5';
          if (char === 'T') return '7';

          return char;
        })
        .join(''),
  },

  {
    id: 't3',
    description: 'CSV:',
    transformFunction: text => {
      if (text.trim() === '') {
        return '';
      }

      return text
        .split(' ')
        .map(word => `"${word}"`)
        .join(';');
    },
  },

  {
    id: 't4',
    description: 'Slug:',
    transformFunction: text =>
      stringHelpers
        .removeSpecialCharacters(text)
        .toLowerCase()
        .split(' ')
        .join('-'),
  },

  {
    id: 't5',
    description: 'Somente vogais:',
    transformFunction: text =>
      text
        .split('')
        .filter(char => char === ' ' || stringHelpers.isVowel(char))
        .join(''),
  },

  {
    id: 't6',
    description: 'Somente consoantes:',
    transformFunction: text =>
      text
        .split('')
        .filter(char => char === ' ' || stringHelpers.isConsonant(char))
        .join(''),
  },

  {
    id: 't7',
    description: 'Variável:',
    transformFunction: text =>
      stringHelpers
        .removeSpecialCharacters(text)
        .split(' ')
        .map((word, index) => {
          return index === 0
            ? word.toLowerCase()
            : word
                .toLowerCase()
                .split('')
                .map((char, index) => {
                  return index === 0 ? char.toUpperCase() : char;
                })
                .join('');
        })
        .join(''),
  },
];

const defaultState = {
  userInput: 'Aprendendo React',
};

export default class App extends Component {
  constructor() {
    super();

    this.state = { ...defaultState };
  }

  componentDidMount() {
    document.title = 'react-text-transformer';
  }

  handleInputChange = newValue => {
    this.setState({ userInput: newValue });
  };

  render() {
    const { userInput } = this.state;

    return (
      <div className="container">
        <h1 className="center">react-text-transformer</h1>

        <Input
          id="userInput"
          autoFocus
          value={userInput}
          description="Digite um texto qualquer:"
          onChange={this.handleInputChange}
        />

        <div style={{ marginTop: '20px' }}>
          <h2 className="center">Transformações</h2>

          <Transformations>
            {MY_TRANSFORMATIONS.map(
              ({ id, description, transformFunction }) => {
                const value = transformFunction(userInput);

                return (
                  <div key={id}>
                    <Transformation
                      id={id}
                      description={description}
                      value={value}
                    />
                  </div>
                );
              }
            )}
          </Transformations>
        </div>
      </div>
    );
  }
}
