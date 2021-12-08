import fs from 'fs'

class Problems {
  constructor() {
    this.numbers = fs.readFileSync('input').toString().split('\n').map(e => {
      const pieces = e.split(' | ')
      return {
        signal: pieces[0].split(' '),
        output: pieces[1].split(' ')
      }
    })

    this.uniqueDigits = [2, 3, 4, 7]

    this.translated = {
      bblbrttltr: '0',
      brtr: '1',
      bblmttr: '2',
      bbrmttr: '3',
      brmtltr: '4',
      bbrmttl: '5',
      bblbrmttl: '6',
      brttr: '7',
      bblbrmttltr: '8',
      bbrmttltr: '9',
    }
  }

  partOne = () => this.numbers.reduce((c, e) => c + e.output.filter(d => this.uniqueDigits.includes(d.length)).length, 0)

  // figure out which letter corresponds to each segment
  getSegments = (signal) => {
    const segments = {
      t: '',
      tl: '',
      tr: '',
      m: '',
      bl: '',
      br: '',
    }

    const one = signal.find(s => s.length === 2)
    const seven = signal.find(s => s.length === 3)
    const four = signal.find(s => s.length === 4)
    const eight = signal.find(s => s.length === 7)
    segments.t = seven.split('').filter(c => !one.split('').includes(c))[0]

    const sixSegments = signal.filter(s => s.length === 6)
    const blBottom = eight.split('').filter(c => !four.split('').includes(c)).filter(c => c !== segments.t)
    const zero = sixSegments.find(s => [...one.split(''), ...blBottom].every(d => s.split('').includes(d)))

    const nine = sixSegments.filter(n => n !== zero).find(s => s.includes(one.split('')[0]) && s.includes(one.split('')[1]))
    const six = sixSegments.filter(n => n !== zero && n !== nine)[0]

    segments.m = eight.split('').filter(c => !zero.split('').includes(c))[0]
    segments.tl = four.split('').filter(c => !seven.split('').includes(c)).filter(c => c !== segments.m)[0]
    segments.tr = eight.split('').filter(c => !six.split('').includes(c))[0]
    segments.bl = eight.split('').filter(c => !nine.split('').includes(c))[0]
    segments.br = one.replace(segments.tr, '')

    const allSegmentsButBottom = Object.values(segments)

    segments.b = eight.split('').filter(c => !allSegmentsButBottom.includes(c))[0]

    return segments
  }

  getDigit = (segments, digit) => {
    return this.translated[Object.entries(segments).sort().filter(([segment, c]) => digit.includes(c)).map(s => s[0]).join('')]
  }

  getOutput = (segments, output) => parseInt(output.reduce((number, digit) => number + this.getDigit(segments, digit), ''))

  partTwo = () => this.numbers.reduce((t, e) => t + this.getOutput(this.getSegments(e.signal), e.output), 0)

  solve = () => {
    console.log('Part One:', this.partOne())
    console.log('Part Two:', this.partTwo())
  }
}

const solver = new Problems
solver.solve()
