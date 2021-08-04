import { typeCheck, Left, Right } from '../src/renoir.js'

export default assert => {
  const leftEth = Left('This is a left either')
  const rightEth = Right('This is a right either')

  assert.plan(16)

  assert.equal(
    typeof typeCheck,
    'function',
    'The type check module returns a function and...'
  )

  const trueCheck = typeCheck(true)

  assert.equal(
    typeof trueCheck,
    'function',
    'that function takes an argument and returns a function and...'
  )

  const testString = trueCheck('string')

  assert.equal(
    typeof trueCheck,
    'function',
    'that function also takes an argument and returns a function' +
            ' and...'
  )

  const stringEth = testString(rightEth)

  assert.equal(
    stringEth.isEither(),
    true,
    'that function takes a right either and returns an either' + ' and...'
  )
  assert.equal(
    stringEth.isRight(),
    true,
    'that either is a right either and...'
  )
  assert.equal(
    rightEth,
    stringEth,
    'that either is the same one that was passed in and...'
  )

  const failedEth = testString(leftEth)

  assert.equal(
    failedEth.isEither(),
    true,
    'that function takes a left either and returns an either' + ' and...'
  )
  assert.equal(
    failedEth.isLeft(),
    true,
    'that either is a left either and...'
  )
  assert.equal(
    leftEth,
    failedEth,
    'that either is the same one that was passed in and...'
  )

  const noCheck = typeCheck(false)('string')
  const helloEth = Right('hello')
  const numEth = Right(10)
  const arrEth = Right([1, 2, 3, 4, 5])
  const failEth = Left('Failed')

  assert.equal(helloEth, noCheck(helloEth))
  assert.equal(numEth, noCheck(numEth))
  assert.equal(arrEth, noCheck(arrEth))
  assert.equal(
    failEth,
    noCheck(failEth),
    'that function always returns the same either back when' +
            ' checks are disabled and...'
  )

  const helloPass = testString(helloEth)
  const numFail = testString(numEth)
  const arrFail = testString(arrEth)

  assert.equal(helloPass, helloEth)
  assert.equal(
    numFail.left().message,
    'Type check failed: string expected but number detected.'
  )
  assert.equal(
    arrFail.left().message,
    'Type check failed: string expected but Array detected.',
    'that function returns the given values for the given eithers'
  )

  assert.end()
}
