import fs from 'fs'

class Problems {
  constructor() {
    this.map = fs.readFileSync('input').toString().split('\n').map(r => r.split('').map(n => parseInt(n)))
    this.maxCol = this.map[0].length - 1
    this.maxRow = this.map.length - 1
    this.visited = []
    this.basins = []
    this.basin = []
  }

  isValley = (value, column, row) => {
    const higherThanLeft = column-1 < 0 ? true : value < this.map[row][column-1]
    const higherThanRight = column+1 > this.maxCol ? true : value < this.map[row][column+1]
    const higherThanTop = row-1 < 0 ? true : value < this.map[row-1][column]
    const higherThanBottom = row+1 > this.maxRow ? true : value < this.map[row+1][column]

    return higherThanLeft && higherThanRight && higherThanTop && higherThanBottom
  }

  partOne = () => this.map.reduce((count, row, rowIndex) => count + row.reduce((risk, column, columnIndex) => this.isValley(column, columnIndex, rowIndex) ? risk + 1 + column : risk, 0), 0)

  markBasin = (row, col) => {
    if (row < 0 || col < 0 || row > this.maxRow || col > this.maxCol) return
    if (this.visited.find(v => v.row === row && v.col === col)) return

    if (this.map[row][col] === 9) return
    this.visited.push({ row, col })
    this.basin.push(this.map[row][col])

    this.markBasin(row-1, col);
    this.markBasin(row+1, col);
    this.markBasin(row, col-1);
    this.markBasin(row, col+1);
  }

  partTwo = () => {
    this.map.forEach((row, rowIndex) => row.forEach((col, colIndex) => {
      this.basin = []
      this.markBasin(rowIndex, colIndex)
      if (this.basin.length) this.basins.push(this.basin)
    }))
    return this.basins.reduce((longest, basin) => {
      if (longest.length < 3) {
        longest.push(basin)
        return longest.sort((a, b) => a.length - b.length)
      }
      const longerThanIndex = longest.findIndex(l => basin.length > l.length)
      if (longerThanIndex > -1) {
        longest[longerThanIndex] = basin
        return longest.sort((a, b) => a.length - b.length)
      }
      return longest
    }, []).reduce((total, basin) => total * basin.length, 1)
  }

  solve = () => {
    console.log('Part One:', this.partOne())
    console.log('Part Two:', this.partTwo())
  }
}

const solver = new Problems
solver.solve()
