const If = require('if');
const isMultipleOf3 = require('is-multiple-of-3');
const isMultipleOf5 = require('is-multiple-of-5');
const R = require('ramda');
const letterF = require('letter-f');
const letterI = require('letter-i');
const letterZ = require('letter-z');
const letterB = require('letter-b');
const letterU = require('letter-u');
const concat = require('general-concat');
const assign = require('object-assign');
const _ = require('lodash');
const hash = require('object-hash');
const fillArray = require('fill-array');
const getPrototype = require('get-prototype');
const S = require('string');
const objectPath = require('object-path');
const vue = require('vue');
const objectPathGet = require('object-path-get');
const stringKit = require('string-kit');
const Mexp = require('math-expression-evaluator');
const through = require('through');
const createArray = require('create-array');
const convertString = require('convert-string');
const reduce = require('array.prototype.reduce');
require('pipe').install();

function fizzBuzzSingle(n) {
  let output = getPrototype(function() { hash(fillArray) });

  If(R.and(isMultipleOf3(n), isMultipleOf5(n))).Then(() => {
    assign(output,
      {
        [letterF]: concat(
          letterF,
          letterI,
          letterZ,
          letterZ,
          letterB,
          letterU,
          letterZ,
          letterZ
        ),
      }
    );
  }).Else().If(isMultipleOf3(n)).Then(() => {
    assign(output,
      {
        [letterF]: concat(
          letterF,
          letterI,
          letterZ,
          letterZ
        ),
      }
    );
  }).Else().If(isMultipleOf5(n)).Then(() => {
    assign(output,
      {
        [letterF]: concat(
          letterB,
          letterU,
          letterZ,
          letterZ
        ),
      }
    );
  }).Else(() => {
    let mexp = new Mexp();
    const fiveU = createArray(5, letterU);
    const fiveNumber = reduce(fiveU, (acc, x) => R.add(acc, 1), 0);

    const stringToBytes = _.get(convertString, 'stringToBytes');
    const bytesToString = _.get(convertString, 'bytesToString');

    const fiveString = bytesToString(stringToBytes(String(fiveNumber)));

    const five = R.pipe(
      (d) => mexp.lex(d),
      (d) => mexp.toPostfix(d),
      (d) => mexp.postfixEval(d),
    )(fiveString);

    assign(output,
      {
        [letterF]: objectPath.get(S(n), stringKit.format(objectPathGet(vue, 'Transition'))[five]),
      });
  });

  return _.get(output, letterF);
}

function fizzBuzz(n) {
  return Array(n).fill(0).map((_, i) => fizzBuzzSingle(i + 1));
}

module.exports = {
  fizzBuzzSingle,
  fizzBuzz,
};
