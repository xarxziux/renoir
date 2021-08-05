import { trampoline } from '../src/renoir.js'

export default assert => {
  const addUp = ({ accum = 0, current = 0 }) =>
    current <= 0
      ? { accum }
      : {
          accum: accum + 1,
          current: current - 1
        }

  assert.plan(9)

  assert.equal(
    typeof trampoline,
    'function',
    'The trampoline module returns a function and...'
  )

  const addTramp = trampoline(addUp)

  assert.equal(
    typeof addTramp,
    'function',
    'sending that function a function returns another function' +
            ' and...'
  )

  assert.equal(addTramp({ current: -10 }), 0)
  assert.equal(addTramp({ current: 0 }), 0)
  assert.equal(addTramp({ current: 1 }), 1)
  assert.equal(addTramp({ current: 2 }), 2)
  assert.equal(addTramp({ current: 10 }), 10)
  assert.equal(
    addTramp({ current: 1001 }),
    1001,
    'that function returns the expected result and...'
  )
  assert.equal(
    addTramp({ current: 1234567 }),
    1234567,
    'sending a large number to that function does not overflow' +
            ' the stack.'
  )

  assert.end()
}
