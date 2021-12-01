import fs from 'fs'

class Problems {
  getFileContents = () => {
    if (!this.file) {
      this.file = fs.readFileSync('input').toString().split("\n").map(l => parseInt(l));
    }
    return this.file
  }

  partOne = () => {
    const numbers = this.getFileContents()
    return numbers.reduce((count, line, index) => {
      const current = line
      const last = numbers[index-1]

      if (current > last) return count+1
      return count
    }, 0)
  }

  partTwo = () => {
    const numbers = this.getFileContents()
    return numbers.reduce((count, line, index) => {
      if (index < 3) return count

      const currentWindow = line + numbers[index-1] + numbers[index-2]
      const lastWindow = numbers[index-1] + numbers[index-2] + numbers[index-3]

      if (currentWindow > lastWindow) return count+1
      return count
    }, 0)
  }

  solve = () => {
    console.log('Part One:', this.partOne())
    console.log('Part Two:', this.partTwo())
  }
}

const solver = new Problems
solver.solve()
