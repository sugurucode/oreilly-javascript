import { promisify } from 'util'
import { exec } from 'child_process'

describe('charfreq', () => {
  it('変更前と結果が同じであること', async () => {
    const stdout = await promisify(exec)(
      'npx tsx exercises-public/exercises/ch02/ex05/index.ts < exercises-public/exercises/ch02/ex05/charfreq.ts',
    )
    const expectedStdout = await promisify(exec)(
      'npx tsx exercises-public/exercises/ch02/ex05/charfreq.ts < exercises-public/exercises/ch02/ex05/charfreq.ts',
    )
    expect(stdout.toString()).toBe(expectedStdout.toString())
  })
})
