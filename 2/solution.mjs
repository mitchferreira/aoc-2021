import fs from 'fs'

class Problems {
  constructor() {
    this.c = fs.readFileSync('input').toString().split("\n").map(l => {
      const pieces = l.split(' ')
      return [pieces[0], parseInt(pieces[1])]
    });
  }

  start = () => {
    this.d = 0;
    this.h = 0;
    this.a = 0;
  }

  updatePositionOne = ([dir, dis]) => {
    if (dir === 'forward') this.h += dis
    else if (dir === 'up') this.d -= dis
    else this.d += dis
  }

  partOne = () => {
    this.c.forEach((c) => this.updatePositionOne(c))
    return this.d * this.h
  }

  updatePositionTwo = ([dir, dis]) => {
    if (dir === 'down') this.a += dis
    else if (dir === 'up') this.a -= dis
    else {
      this.h += dis
      this.d += dis * this.a
    }
  }

  partTwo = () => {
    this.c.forEach((c) => this.updatePositionTwo(c))
    return this.d * this.h
  }

  solve = () => {
    this.start()
    console.log('Part One:', this.partOne())
    this.start()
    console.log('Part Two:', this.partTwo())
  }
}

const solver = new Problems
solver.solve()
