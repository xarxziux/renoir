const typeOf = require ('number-detect').numberDetect;
const utils = require ('../tmp/core/utils.js');

const testUtils = assert => {
    
    assert.plan (6);
    assert.equal (typeOf (utils), 'Object',
        'The utils module returns an object and...');
    assert.equal (typeof utils.isNull, 'function');
    assert.equal (typeof utils.isNotNull, 'function');
    assert.equal (typeof utils.isError, 'function');
    assert.equal (typeof utils.throwError, 'function');
    assert.equal (typeof utils.getBetween, 'function');
    assert.end();

};

const testNull = assert => {
    
    const {isNull, isNotNull} = utils;
    
    let undefVar;
    const nullVar = null;
    const emptyObj = {};
    const noReturnFN = () => {};
    
    assert.plan (26);
    assert.equal (typeof isNull, 'function',
        'isNull is a function and...');
    assert.equal (typeof isNotNull, 'function',
        'isNotNull is a function and...');
    assert.equal (isNull (), true);
    assert.equal (isNotNull (), false);
    /* eslint-disable no-undefined */
    assert.equal (isNull (undefined), true);
    assert.equal (isNotNull (undefined), false);
    /* eslint-enable no-undefined */
    /* eslint-disable no-void */
    assert.equal (isNull (void 0), true);
    assert.equal (isNotNull (void 0), false);
    /* eslint-enable no-void */
    assert.equal (isNull (null), true);
    assert.equal (isNotNull (null), false);
    assert.equal (isNull (undefVar), true);
    assert.equal (isNotNull (undefVar), false);
    assert.equal (isNull (nullVar), true);
    assert.equal (isNotNull (nullVar), false);
    assert.equal (isNull (emptyObj.noProp), true);
    assert.equal (isNotNull (emptyObj.noProp), false);
    assert.equal (isNull (noReturnFN()), true);
    assert.equal (isNotNull (noReturnFN()), false);
    assert.equal (isNull (0), false);
    assert.equal (isNotNull (0), true);
    assert.equal (isNull (''), false);
    assert.equal (isNotNull (''), true);
    assert.equal (isNull ({}), false);
    assert.equal (isNotNull ({}), true);
    assert.equal (isNull ([]), false);
    assert.equal (isNotNull ([]), true);
    assert.end();
    
};

const testError = assert => {
    
    const {isError} = utils;
    
    assert.plan (14);
    assert.equal (typeof (isError), 'function',
        'isError is a function and...');
    assert.equal (isError (new Error ('')), true);
    assert.equal (isError (new EvalError ('')), true);
    assert.equal (isError (new RangeError ('')), true);
    assert.equal (isError (new ReferenceError ('')), true);
    assert.equal (isError (new SyntaxError ('')), true);
    assert.equal (isError (new TypeError ('')), true);
    assert.equal (isError (new URIError ('')), true,
        'that function return true for all Error types and...');
    assert.equal (isError (), false);
    assert.equal (isError (null), false);
    assert.equal (isError (1234), false);
    assert.equal (isError ('a string'), false);
    assert.equal (isError ({x: 'an object'}), false);
    assert.equal (isError (() => null), false,
        'that function returns false for all other values.');
    assert.end();
    
};

const testGetBetween = assert => {
    
    const {getBetween} = utils;
    
    assert.plan (23);
    assert.equal (typeof getBetween, 'function',
        'getBetween is a function and...');
    
    const inRange = getBetween (-47.36, 106);
    
    assert.equal (typeof inRange, 'function',
        'that function returns another function when called with numeric' +
                ' parameters and...');
    assert.equal (inRange (0), 0);
    assert.equal (inRange (100), 100);
    assert.equal (inRange (55.123), 55.123);
    assert.equal (inRange (4000), 106);
    assert.equal (inRange (Infinity), 106);
    assert.equal (inRange (-86), -47.36);
    assert.equal (inRange (-204), -47.36);
    assert.equal (inRange (-48), -47.36);
    assert.equal (inRange (-47.2), -47.2);
    assert.equal (inRange (-Infinity), -47.36,
        'that function returns the expected values and...');
    
    const inRange2 = getBetween ('-106.334', 530.55);
    
    assert.equal (inRange2 ('0'), 0);
    assert.equal (inRange2 ('205.66'), 205.66);
    assert.equal (inRange2 ('8000'), 530.55);
    assert.equal (inRange2 ('Infinity'), 530.55);
    assert.equal (inRange2 ('-8000'), -106.334);
    assert.equal (inRange2 ('-Infinity'), -106.334,
        'the getBetween function can correctly deal with numeric strings' +
                ' and...');
    
    const inRange3 = getBetween (-Infinity, Infinity);
    
    assert.equal (inRange3 (0), 0);
    assert.equal (inRange3 (1000000), 1000000);
    assert.equal (inRange3 (-1000000), -1000000);
    assert.equal (inRange3 (1 / 0), Infinity);
    assert.equal (inRange3 (-1 / 0), -Infinity,
        'that function correctly deals with Infinity and negative Infinity');
    assert.end();
    
};

module.exports = assert => {
    
    assert.test ('Test that the module returns an object with 6 functions',
        testUtils);
    
    assert.test ('Test that the null functions work as expected', testNull);
    
    assert.test ('Test that the isError function works as expected',
        testError);
    
    assert.test ('Test that the getBetween function works as expected',
        testGetBetween);
    
};
