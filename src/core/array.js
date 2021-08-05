import typeOf from 'number-detect'
import { throwError } from './utils.js'

export const getBlankArray = (arrSize, base = null) =>
  Number.isNaN(arrSize - 0)
    ? throwError('getBlankArray: invalid parameter.')
    : Array(arrSize - 0).fill(base)

export const getSequentialArray = (arrSize, step = 1, firstValue = 0) =>
  typeOf(arrSize) !== 'number' ||
    typeOf(step) !== 'number' ||
    typeOf(firstValue) !== 'number'
    ? throwError('getSequentialArray: invalid parameter(s)')
    : getBlankArray(arrSize).map((_, i) => firstValue + i * step)
