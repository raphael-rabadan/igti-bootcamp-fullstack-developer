// prettier-ignore
const WITH_SPECIAL_CHARACTERS = 
  'áãâäàÁÃÂÄÀéêëèÉÊËÈíîïìÍÎÏÌóõôöòÓÕÔÖÒúûüùÚÛÜÙñÑçÇ'.split('');

// prettier-ignore
const WITHOUT_SPECIAL_CHARACTERS = 
  'aaaaaAAAAAeeeeEEEEiiiiIIIIoooooOOOOOuuuuUUUUnNcC'.split('');

const VOWELS = 'aáãâäàeéêëèiíîïìoóõôöòuúûüù'.split('');

export function isNumber(char) {
  return !isNaN(char);
}

export function helperIsVowel(char) {
  return VOWELS.includes(char.toLowerCase());
}

export function helperIsConsonant(char) {
  return !helperIsVowel(char) && !isNumber(char);
}

export function helperRemoveSpecialCharactersFrom(text) {
  return text
    .split('')
    .map(char => {
      const index = WITH_SPECIAL_CHARACTERS.indexOf(char);
      return index < 0 ? char : WITHOUT_SPECIAL_CHARACTERS[index];
    })
    .join('');
}
