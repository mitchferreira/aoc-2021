import fs from 'fs'

class Problems {
  constructor() {
    this.d = fs.readFileSync('input').toString().split("\n")
    this.f = [0,0,0,0,0,0,0,0,0,0,0,0]
  }

  getGamma = input => input.reduce((t, d) => d.split('').map((n, i) => t[i] + parseInt(n)), this.f).map(n => n >= input.length / 2 ? '1' : '0').join('')

  flipBits = num => num.split('').map(n => n === '1' ? '0' : '1').join('')

  getEpsilon = input => this.flipBits(input)

  partOne = () => {
    this.gamma = this.getGamma(this.d)
    this.epsilon = this.getEpsilon(this.gamma)
    return parseInt(this.gamma, 2) * parseInt(this.epsilon, 2)
  }

  partTwo = () => {
    let c = this.d
    let o = this.d
    let i = 0
    while (o.length > 1 || c.length > 1) {
      const newOxygens = o.filter(e => e[i] === this.getGamma(o).split('')[i])
      o = newOxygens[0] ? newOxygens : o
      const newCarbons = c.filter(e => e[i] === this.getEpsilon(this.getGamma(c)).split('')[i])
      c = newCarbons[0] ? newCarbons : c
      i++
    }
    return parseInt(o[0], 2) * parseInt(c[0], 2)
  }

  solve = () => {
    console.log('Part One:', this.partOne(this.d))
    console.log('Part Two:', this.partTwo())
  }
}

const solver = new Problems
solver.solve()
