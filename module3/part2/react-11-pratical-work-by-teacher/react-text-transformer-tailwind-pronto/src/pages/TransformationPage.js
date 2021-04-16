import React, { Component } from 'react';
import Header from '../components/Header';
import Input from '../components/Input';
import Main from '../components/Main';

import { v4 as uuid } from 'uuid';

import {
  helperRemoveSpecialCharactersFrom,
  helperIsVowel,
  helperIsConsonant,
} from '../helpers/textHelpers';

const TEXT_TO_NUMBER = {
  O: 0,
  L: 1,
  E: 3,
  A: 4,
  S: 5,
  T: 7,
};

const MY_TRANSFORMATIONS = [
  {
    id: uuid(),
    description: 'Texto reverso:',
    transformFunction: text => text.split('').reverse().join(''),
  },

  {
    id: uuid(),
    description: 'Texto numérico:',
    transformFunction: text =>
      helperRemoveSpecialCharactersFrom(text.toUpperCase())
        .split('')
        .map(char => TEXT_TO_NUMBER[char] || char)
        .join(''),
  },

  {
    id: uuid(),
    description: 'CSV:',
    transformFunction: text =>
      text
        .split(' ')
        .map(word => `"${word}"`)
        .join(';'),
  },

  {
    id: uuid(),
    description: 'Slug:',
    transformFunction: text =>
      helperRemoveSpecialCharactersFrom(text.toLowerCase())
        .split(' ')
        .join('-'),
  },

  {
    id: uuid(),
    description: 'Somente vogais:',
    transformFunction: text =>
      text
        .split('')
        .filter(char => helperIsVowel(char) || char === ' ')
        .join(''),
  },

  {
    id: uuid(),
    description: 'Somente consoantes:',
    transformFunction: text =>
      text
        .split('')
        .filter(char => helperIsConsonant(char) || char === ' ')
        .join(''),
  },

  {
    id: uuid(),
    description: 'Variável:',
    transformFunction: text =>
      helperRemoveSpecialCharactersFrom(text.toLowerCase())
        .split(' ')
        .map((word, index) => {
          if (index !== 0) {
            return `${word[0].toUpperCase()}${word.substring(1)}`;
          }

          return word;
        })
        .join(''),
  },
];

const defaultState = { userInput: 'Trabalho Prático' };

export default class TransformationPage extends Component {
  constructor() {
    super();

    this.state = { ...defaultState };
  }

  componentDidMount() {
    document.title = 'react-text-transformer';
  }

  handleUserInputChange = newText => {
    this.setState({ userInput: newText });
  };

  render() {
    const { userInput } = this.state;

    return (
      <div style={{ fontFamily: 'JetBrains Mono, monospace' }}>
        <Header>
          <h1>react-text-transformer</h1>
        </Header>

        <Main>
          <Input
            id="inputUser"
            autoFocus
            className="my-4"
            description="Digite um texto qualquer:"
            value={userInput}
            onChange={this.handleUserInputChange}
          />

          <h2 className="mt-12 text-center text-xl font-semibold">
            Transformações
          </h2>

          {MY_TRANSFORMATIONS.map(({ id, description, transformFunction }) => {
            const value = transformFunction(userInput);

            return (
              <Input
                key={id}
                id={id}
                className="my-4"
                description={description}
                value={value}
                allowCopy
                readOnly
              />
            );
          })}
        </Main>
      </div>
    );
  }
}
