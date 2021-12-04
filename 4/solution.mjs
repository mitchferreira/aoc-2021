import fs from 'fs'

class Problems {
  constructor() {
    const parsed = fs.readFileSync('input').toString().split("\n\n")
    this.n = parsed.shift().split(',')
    const boards = parsed.map(p => p.split('\n').map(r => r.replace(/  +/g, ' ').split(' ').filter(c => c)))
    this.boards1 = boards
    this.boards2 = boards
    this.winningIndexes = []
  }

  markNumber = (m, boards) => boards.map(b => b.map(r => r.map(c => c === m ? '' : c)))

  won1 = (boards) => {
    for (let boardIndex=0; boardIndex<boards.length; boardIndex++) {
      const board = boards[boardIndex]
      for (let rowIndex=0; rowIndex<board.length; rowIndex++) {
        const row = board[rowIndex]
        let rowWon = true
        for (let colIndex=0; colIndex<row.length; colIndex++) {
          const col = row[colIndex]
          if (col !== '') {
            rowWon = false
            continue
          }
          if (rowIndex === 0) {
            let colWon = true
            for (let i=1; i<board.length; i++) {
              if (board[i][colIndex] !== '') {
                colWon = false
                break
              }
            }
            if (colWon) return board
          }
        }
        if (rowWon) return board
      }
    }
  }

  markNumber2 = (m, boards) => boards.map((b, i) => this.winningIndexes.includes(i) ? b : b.map(r => r.map(c => c === m ? '' : c)))

  // Find winning boards and add their indexes to the list of winners
  // Skip over boards that have already won
  won2 = (boards) => {
    for (let boardIndex=0; boardIndex<boards.length; boardIndex++) {
      if (this.winningIndexes.includes(boardIndex)) continue
      const board = boards[boardIndex]
      for (let rowIndex=0; rowIndex<board.length; rowIndex++) {
        const row = board[rowIndex]
        let rowWon = true
        for (let colIndex=0; colIndex<row.length; colIndex++) {
          const col = row[colIndex]
          if (col !== '') {
            rowWon = false
            continue
          }
          if (rowIndex === 0) {
            let colWon = true
            for (let i=1; i<board.length; i++) {
              if (board[i][colIndex] !== '') {
                colWon = false
                break
              }
            }
            if (colWon) {
              this.winningIndexes.push(boardIndex)
            }
          }
        }
        if (rowWon) {
          this.winningIndexes.push(boardIndex)
        }
      }
    }
  }

  calculateResult = (winner, lastNum) => winner.flat().reduce((r, n) => n === '' ? r : r + parseInt(n), 0) * lastNum

  partOne = () => {
    for (let i=0; i<this.n.length; i++) {
      this.boards1 = this.markNumber(this.n[i], this.boards1)
      const winner = this.won1(this.boards1)
      if (winner) return this.calculateResult(winner, this.n[i])
    }
  }

  partTwo = () => {
    for (let i=0; i<this.n.length; i++) {
      const totalWinners = this.winningIndexes.length
      this.boards2 = this.markNumber2(this.n[i], this.boards2)
      this.won2(this.boards2)
      this.lastWinningNumber = this.winningIndexes.length > totalWinners ? this.n[i] : this.lastWinningNumber
    }
    const winners = [...new Set(this.winningIndexes)]
    const lastWinner = this.boards2[winners[winners.length-1]]
    return this.calculateResult(lastWinner, this.lastWinningNumber)
  }

  solve = () => {
    console.log('Part One:', this.partOne(this.d))
    console.log('Part Two:', this.partTwo())
  }
}

const solver = new Problems
solver.solve()
