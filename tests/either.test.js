const typeOf = require ('number-detect').numberDetect;
const Either = require ('../tmp/core/either.js');

const isError = x => Object.prototype.toString.call (x) === '[object Error]';

const testEitherMain = assert => {
    
    assert.plan (3);
    
    assert.equal (typeOf (Either), 'Object',
        'The either module returns an object and...');
    assert.equal (typeof Either.Left, 'function',
        'that object contains a Left() function and...');
    assert.equal (typeof Either.Right, 'function',
        'that object contains a Right() function and...');
    
    assert.end();
    
};

const testEitherRight = assert => {
    
    const testRightEither = Either.Right (10);
    
    assert.plan (10);
    
    assert.equal (typeOf (testRightEither), 'Object',
        'Calling Right returns an object and...');
    assert.equal (typeof testRightEither.isLeft, 'function',
        'that object contains an isLeft function and...');
    assert.equal (testRightEither.isLeft(), false,
        'that function returns false and...');
    assert.equal (typeof testRightEither.left, 'function',
        'that object contains a left function and...');
    assert.equal (typeof testRightEither.isRight, 'function',
        'that object contains an isRight function and...');
    assert.equal (testRightEither.isRight(), true,
        'that function returns true and...');
    assert.equal (typeof testRightEither.right, 'function',
        'that object contains a right function and...');
    assert.equal (testRightEither.right(), 10,
        'that function returns 10 and...');
    assert.equal (typeof testRightEither.isEither, 'function',
        'that object contains an isEither function.');
    assert.equal (testRightEither.isEither(), true,
        'that function returns true.');
    
    assert.end();
    
};

const testEitherLeft = assert => {
    
    const leftMessage = 'Does this work?';
    const testLeftEither = Either.Left (leftMessage);
    
    assert.plan (10);
    
    assert.equal (typeOf (testLeftEither), 'Object',
        'Calling Left returns an object and...');
    assert.equal (typeof testLeftEither.isLeft, 'function',
        'that object contains an isLeft function and...');
    assert.equal (testLeftEither.isLeft(), true,
        'that function returns true and...');
    assert.equal (typeof testLeftEither.left, 'function',
        'that object contains a left function and...');
    
    const leftVal = testLeftEither.left();
    
    assert.equal (isError (leftVal), true,
        'that function returns an error object and...');
    assert.equal (leftVal.message, leftMessage,
        'that Error contains the string sent to the Either and...');
    assert.equal (typeof testLeftEither.isRight, 'function',
        'that object contains an isRight function and...');
    assert.equal (testLeftEither.isRight(), false,
        'that function returns false and...');
    assert.equal (typeof testLeftEither.right, 'function',
        'that object contains a right function and...');
    assert.equal (typeof testLeftEither.isEither, 'function',
        'that object contains an isEither function.');
    
    assert.end();
    
};

const testEitherOther = assert => {
    
    assert.plan (10);
    
    const errString = 'This is an error';
    const arr = [1, 2, 3];
    const obj = {x: 1, y: 2};
    const err = new Error (errString);
    
    assert.equal (Either.Right ('string').right(), 'string');
    assert.equal (Either.Right ('').right(), '');
    assert.equal (Either.Right (100).right(), 100);
    assert.equal (Either.Right (arr).right(), arr);
    assert.equal (Either.Right (obj).right(), obj);
    assert.equal (Either.Right (null).left().message,
        'Called Right() with a null or void value.');
    assert.equal (Either.Right (err).left().message, errString);
    assert.equal (Either.Left (errString).left().message, errString);
    assert.equal (Either.Left (err).left().message, errString);
    assert.equal (Either.Left (100).left().message,
        'Called Left() with a non-error value.');
    
    assert.end();
    
};

module.exports = assert => {
    
    assert.test ('Test that the module returns an object with two ' +
        ' functions', testEitherMain);
    
    assert.test ('Test that a Right either wraps up the given value',
        testEitherRight);
    
    assert.test ('Test that a Left either wraps up the given string' +
        ' inside an Error object.', testEitherLeft);
    
    assert.test ('Test that various inputs give the expected result.',
        testEitherOther);
    
};
