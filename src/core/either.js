import { isNull, isError, throwError } from './utils.js'

const getErrorObj = err =>
  isError(err)
    ? err
    : typeof err === 'string'
      ? new Error(err)
      : new Error('Called Left() with a non-error value.')

export const Left = err =>
  Object.freeze({
    isLeft: () => true,
    isRight: () => false,
    left: () => getErrorObj(err),
    right: throwError('Cannot call right on an left either.'),
    isEither: () => true
  })

export const Right = data =>
  isNull(data)
    ? Left(new TypeError('Called Right() with a null or void value.'))
    : isError(data)
      ? Left(data)
      : Object.freeze({
        isLeft: () => false,
        isRight: () => true,
        left: throwError('Cannot call left on an right either.'),
        right: () => data,
        isEither: () => true
      })

export const bind = (fn, eth) => {
  if (eth.isLeft()) {
    return eth
  }

  const a = fn(eth.right())

  return isError(a) ? Left(a) : Right(a)
}
