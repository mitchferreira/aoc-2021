import fs from 'fs'

class Problems {
  constructor() {
    this.n = fs.readFileSync('input').toString().split("\n").map(l => parseInt(l));
  }

  partOne = () => this.n.reduce((c, l, i) => l > this.n[i-1] ? c+1 : c, 0)

  partTwo = () => this.n.reduce((c, l, i) => (this.n[i+3] > l) ? c+1 : c, 0)

  solve = () => {
    console.log('Part One:', this.partOne())
    console.log('Part Two:', this.partTwo())
  }
}

const solver = new Problems
solver.solve()
