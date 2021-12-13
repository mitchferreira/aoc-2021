import fs from 'fs'

class Problems {
  constructor() {
    const instructions = fs.readFileSync('input').toString().split('\n\n').map(f => f.split('\n'))
    this.dots = instructions[0].map(d => [parseInt(d.split(',')[0]), parseInt(d.split(',')[1])])
    this.folds = instructions[1].map(f => f.replace('fold along ', '').split('='))
    this.maxX = this.dots.reduce((m, d) => d[0] > m ? d[0] : m, 0) + 1
    this.maxY = this.dots.reduce((m, d) => d[1] > m ? d[1] : m, 0) + 1
    this.map = new Array(this.maxY).fill('.').map(() => new Array(this.maxX).fill('.'));
    this.dots.forEach(([x, y]) => this.map[y][x] = '#')
  }

  prepareFold = ([axis, position]) => {
    if (axis === 'y') {
      const folded = this.map.slice(position).reverse()
      folded.pop()
      this.map = this.map.slice(0, position)
      return folded
    }

    return this.map.map((r, ri) => {
      const fold = r.splice(position).reverse()
      fold.pop()
      return fold
    })
  }

  fold = folded => folded.forEach((r, ri) => r.forEach((c, ci) => this.map[ri][ci] = c === '#' ? c : this.map[ri][ci]))

  countDots = () => {
    return this.map.reduce((d, r) => d + r.reduce((t, c) => c === '#' ? t + 1 : t, 0), 0)
  }

  partOne = () => {
    this.fold(this.prepareFold(this.folds[0]))
    return this.countDots()
  }

  partTwo = () => {
    this.folds.slice(1).forEach(f => this.fold(this.prepareFold(f)))
    return this.map
  }

  solve = () => {
    console.log('Part One: ', this.partOne())
    console.log('Part Two: ', this.partTwo()) // just read the output after, I'm not reading it programmatically
  }
}

const solver = new Problems
solver.solve()
