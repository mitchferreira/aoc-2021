import fs from 'fs'

class Problems {
  constructor() {
    this.crabs = fs.readFileSync('input').toString().split(',').map(f => parseInt(f)).sort((n1, n2) => n1 - n2)
  }

  partOne = () => {
    const crabs = this.crabs
    const median = crabs[crabs.length / 2]
    const fuel = crabs.reduce((f, c) => f + Math.abs(c-median), 0)
    return fuel
  }

  triangle = n => (n * (n + 1)) / 2

  partTwo = () => {
    const alreadyComputed = {}
    const crabs = this.crabs
    const mean = Math.floor(crabs.reduce((f, c) => f + c, 0) / crabs.length)
    const fuel = crabs.reduce((f, c) => {
      if (alreadyComputed[c-mean]) return f + alreadyComputed[c-mean]
      const usage = this.triangle(Math.abs(c-mean))
      alreadyComputed[c-mean] = usage
      return f + usage
    }, 0)
    return fuel
  }

  solve = () => {
    console.log('Part One:', this.partOne())
    console.log('Part Two:', this.partTwo())
  }
}

const solver = new Problems
solver.solve()
