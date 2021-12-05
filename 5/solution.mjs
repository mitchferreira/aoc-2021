import fs from 'fs'

class Problems {
  constructor() {
    let maxX = 0
    let maxY = 0
    this.lines = fs.readFileSync('input').toString().split("\n").map(l => {
      const [point1, point2] = l.split(' -> ')
      const x1 = parseInt(point1.split(',')[0])
      const y1 = parseInt(point1.split(',')[1])
      const x2 = parseInt(point2.split(',')[0])
      const y2 = parseInt(point2.split(',')[1])
      const lineMaxX = x1 > x2 ? x1 : x2
      const lineMaxY = y1 > y2 ? y1 : y2
      maxX = lineMaxX > maxX ? lineMaxX : maxX
      maxY = lineMaxY > maxY ? lineMaxY : maxY
      return {
        point1: {
          x: x1,
          y: y1,
        },
        point2: {
          x: x2,
          y: y2,
        },
        vertical: x1 === x2,
        horizontal: y1 === y2,
        diagonal: x1 !== x2 && y1 !== y2,
      }
    })

    this.map = this.createMap(maxY, maxY)
  }

  // Draw the map with dots
  createMap = (rows, columns) => Array(rows+1).fill().map(() => Array(columns+1).fill('.'));

  // Draw a line on the map
  drawLine = (line, map) => {
    if (line.horizontal) return this.drawHorizontal(line, map)
    else if (line.vertical) return this.drawVertical(line, map)
    else return this.drawDiagonal(line, map)
  }

  drawHorizontal = (line, map) => {
    const startPoint = line.point1.x > line.point2.x ? line.point2.x : line.point1.x
    const endPoint = line.point1.x > line.point2.x ? line.point1.x : line.point2.x
    const y = line.point1.y
    for (let x=startPoint; x<=endPoint; x++) {
      map[y][x] = map[y][x] === '.' ? 1 : map[y][x] + 1
    }
    return map
  }

  drawVertical = (line, map) => {
    const startPoint = line.point1.y > line.point2.y ? line.point2.y : line.point1.y
    const endPoint = line.point1.y > line.point2.y ? line.point1.y : line.point2.y
    const x = line.point1.x
    for (let y=startPoint; y<=endPoint; y++) {
      map[y][x] = map[y][x] === '.' ? 1 : map[y][x] + 1
    }
    return map
  }

  drawDiagonal = (line, map) => {
    let startPoint
    let endPoint

    if (line.point1.x > line.point2.x) {
      startPoint = line.point2
      endPoint = line.point1
    } else {
      startPoint = line.point1
      endPoint = line.point2
    }

    const down = startPoint.y < endPoint.y
    let y = startPoint.y

    for (let x=startPoint.x; x<=endPoint.x; x++) {
      map[y][x] = map[y][x] === '.' ? 1 : map[y][x] + 1
      y = down ? y + 1 : y - 1
    }
    return map
  }

  countOverlap = map => {
    return map.reduce((overlaps, row) => {
      return overlaps + row.filter(c => c > 1).length
    }, 0)
  }

  partOne = () => {
    let map = this.map
    const lines = this.lines.filter(l => !l.diagonal)
    lines.forEach(l => {
      map = this.drawLine(l, map)
    })
    return this.countOverlap(map)
  }

  partTwo = () => {
    let map = this.map
    // just add diagonal lines since the other ones have already been drawn to the map
    const lines = this.lines.filter(l => l.diagonal)
    lines.forEach(l => {
      map = this.drawLine(l, map)
    })
    return this.countOverlap(map)
  }

  solve = () => {
    console.log('Part One:', this.partOne(this.d))
    console.log('Part Two:', this.partTwo())
  }
}

const solver = new Problems
solver.solve()
