import fs from 'fs'

class Problems {
  constructor() {
    this.subsystem = fs.readFileSync('input').toString().split('\n')
    this.incomplete = []
    this.opens = ['(', '[', '{', '<']
    this.closes = [')', ']', '}', '>']
    this.cScores = {
      ')': 3,
      ']': 57,
      '}': 1197,
      '>': 25137,
    }
    this.iScores = {
      ')': 1,
      ']': 2,
      '}': 3,
      '>': 4,
    }
  }

  checkRow = row => {
    const stack = []

    for (let i=0; i<row.length; i++) {
      if (this.opens.includes(row[i])) stack.push(row[i])
      else if (this.closes.includes(row[i])) {
        const matchingOpen = this.opens[this.closes.indexOf(row[i])]
        if (stack.pop() !== matchingOpen) return row[i]
      }
    }

    this.incomplete.push(row)
  }

  partOne = () => {
    return this.subsystem.reduce((points, row) => {
      const error = this.checkRow(row)
      if (error) return points + this.cScores[error]
      return points
    }, 0)
  }

  complete = (row) => {
    const stack = []
    for (let i=0; i<row.length; i++) {
      if (this.opens.includes(row[i])) stack.push(row[i])
      else stack.pop()
    }

    return stack.reverse().map(c => this.closes[this.opens.indexOf(c)])
  }

  partTwo = () => {
    const scores = this.incomplete.map(row => this.complete(row).reduce((points, fix) => points * 5 + this.iScores[fix], 0)).sort((a, b) => a-b)
    return scores[Math.floor(scores.length / 2)]
  }

  solve = () => {
    console.log('Part One:', this.partOne())
    console.log('Part Two:', this.partTwo())
  }
}

const solver = new Problems
solver.solve()
