import { Component } from 'react';
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
    description: 'Texto invertido:',
    transformFunction: text => text.split('').reverse().join(''),
  },

  {
    id: uuid(),
    description: 'Texto numérico:',
    transformFunction: text =>
      helperRemoveSpecialCharactersFrom(text)
        .toUpperCase()
        .split('')
        .map(char => TEXT_TO_NUMBER[char] || char)
        .join(''),
  },

  {
    id: uuid(),
    description: 'Quantidade de caracteres:',
    transformFunction: text => text.length,
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

const DEFAULT_STATE = { userInput: 'Trabalho Prático' };

export default class TransformationPage extends Component {
  constructor() {
    super();

    this.state = { ...DEFAULT_STATE };
  }

  handleUserInputChange = newUserInput => {
    this.setState({ userInput: newUserInput });
  };

  render() {
    const { userInput } = this.state;

    return (
      <div style={{ fontFamily: '"JetBrains Mono", "monospace"' }}>
        <Header className="bg-blue-100">react-transformation</Header>

        <Main>
          <Input
            id="userInput"
            autoFocus
            inputValue={userInput}
            onTextChange={this.handleUserInputChange}
            description="Digite um texto qualquer:"
          />

          <h2 className="text-center my-4">Transformações</h2>

          {MY_TRANSFORMATIONS.map(({ id, description, transformFunction }) => {
            const value = transformFunction(userInput);

            return (
              <Input
                key={id}
                id={id}
                description={description}
                inputValue={value}
                readOnly
                allowCopy
              />
            );
          })}
        </Main>
      </div>
    );
  }
}
