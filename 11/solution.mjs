import fs from 'fs'

class Problems {
  constructor() {
    this.octopuses = fs.readFileSync('input').toString().split('\n').map(r => r.split('').map(n => parseInt(n)))
    this.flashes = 0
    this.maxRow = this.octopuses.length - 1
    this.maxCol = this.octopuses[0].length - 1
    this.totalOctopuses = this.octopuses.length * this.octopuses[0].length
    this.steps = 100
    this.step = 1
  }

  addEnergy = (row, col) => {
    if (row < 0 || col < 0 || row > this.maxRow || col > this.maxCol) return

    if (this.octopuses[row][col] === 10) return
    this.octopuses[row][col] += 1

    if (this.octopuses[row][col] < 10) return

    // up
    this.addEnergy(row-1, col);
    // down
    this.addEnergy(row+1, col);
    // left
    this.addEnergy(row, col-1);
    // right
    this.addEnergy(row, col+1);
    // up left
    this.addEnergy(row-1, col-1);
    // up right
    this.addEnergy(row-1, col+1);
    // down left
    this.addEnergy(row+1, col-1);
    // down right
    this.addEnergy(row+1, col+1);
  }

  countFlashes = () => {
    let thisStep = 0
    this.octopuses.forEach((r, ri) => {
      r.forEach((c, ci) => {
        if (this.octopuses[ri][ci] === 10) {
          this.flashes += 1
          thisStep += 1
          this.octopuses[ri][ci] = 0
        }
      })
    })

    if (thisStep === this.totalOctopuses) this.simultaneous = this.simultaneous ? this.simultaneous : this.step
  }

  partOne = () => {
    for (let i=0; i<this.steps; i++) {
      this.octopuses.forEach((r, ri) => {
        r.forEach((c, ci) => {
          this.addEnergy(ri, ci)
        })
      })
      this.countFlashes()
      this.step += 1
    }

    return this.flashes
  }

  partTwo = () => {
    // Just continue on from step one
    while (!this.simultaneous) {
      this.octopuses.forEach((r, ri) => {
        r.forEach((c, ci) => {
          this.addEnergy(ri, ci)
        })
      })
      this.countFlashes()
      this.step += 1
    }
    return this.simultaneous
  }

  solve = () => {
    console.log('Part One: ', this.partOne())
    console.log('Part Two: ', this.partTwo())
  }
}

const solver = new Problems
solver.solve()
