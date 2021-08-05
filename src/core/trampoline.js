import { isNotNull } from './utils.js'

export const trampoline = fn => input => {
  if (typeof input !== 'object') return null

  let { accum, current } = input

  while (isNotNull(current)) ({ accum, current } = fn({ accum, current }))

  return accum
}
