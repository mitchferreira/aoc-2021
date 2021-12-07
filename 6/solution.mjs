import fs from 'fs'

class Problems {
  constructor() {
    this.fish = fs.readFileSync('input').toString().split(',').map(f => parseInt(f))
    this.fishHash = {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
    }
    this.fish.forEach(fish => {
      this.fishHash[fish] = this.fishHash[fish] + 1
    })
  }

  simulateFish = (duration) => {
    const fish = JSON.parse(JSON.stringify(this.fishHash)) // copy the object value instead of its reference
    for (let i = 0; i < duration; i++) {
      const newFish = fish[0]
      fish[0] = fish[1]
      fish[1] = fish[2]
      fish[2] = fish[3]
      fish[3] = fish[4]
      fish[4] = fish[5]
      fish[5] = fish[6]
      fish[6] = fish[7] + newFish
      fish[7] = fish[8]
      fish[8] = newFish
    }

    return Object.values(fish).reduce((f, t) => t + f)
  }

  solve = () => {
    console.log('Part One:', this.simulateFish(80))
    console.log('Part Two:', this.simulateFish(256))
  }
}

const solver = new Problems
solver.solve()
