import numberDetect from 'number-detect'
import { Left } from './either.js'

const typeOf = numberDetect.numberDetect

export const typeCheck = checksEnabled => targetType => eth => {
  if (!checksEnabled || eth.isLeft()) return eth

  const ethType = typeOf(eth.right())

  if (ethType === targetType) return eth

  return Left(
        `Type check failed: ${targetType} expected but ${ethType} detected.`
  )
}
