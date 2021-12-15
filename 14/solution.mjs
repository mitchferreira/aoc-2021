import fs from 'fs'

class Problems {
  constructor() {
    const input = fs.readFileSync('input').toString().split('\n\n')
    this.start = input[0]
    this.polymer = input[0].split('')
    this.polymer2 = input[0].split('')
    this.insertions = input[1].split('\n').map(i => i.replaceAll(' ', '').split('->')).reduce((o, c) => ({ ...o, [c[0]]: c[1] }), {})
    this.cycles1 = 10
    this.cycles2 = 40
  }

  insert = () => {
    for(let i=0; i<this.polymer.length; i++) {
      const key = `${this.polymer[i]}${this.polymer[i+1]}`
      if (this.insertions[key]) {
        this.polymer.splice(i+1, 0, this.insertions[key])
        i++
      }
    }
  }

  countChars = () => {
    const counts = {}
    this.polymer.forEach(c => {
      if (counts[c]) counts[c] = counts[c] + 1
      else counts[c] = 1
    })
    return counts
  }

  mostMinusLeast = (foo) => {
    const counts = foo || this.countChars()
    const [max, min] = Object.values(counts).reduce((v, c) => [!v[0] || c > v[0] ? c : v[0], (!v[1] || c < v[1]) ? c : v[1]], [])
    return max-min
  }

  partOne = () => {
    for(let i=0; i<this.cycles1; i++) {
      this.insert()
    }

    return this.mostMinusLeast()
  }

  count = () => {
    const template = this.polymer.join('')
    const counter = {}

    for (let i=0; i<template; i++) {
      counter[template[i]]
    }
  }

  setup = () => {
    const map = this.createMap()
    for (let i=0; i<this.polymer2.length; i++) {
      map[`${this.polymer2[i]}${this.polymer2[i+1]}`] += 1
    }
    return map
  }

  createMap = () => Object.keys(this.insertions).reduce((o, key) => ({...o, [key]: 0 }), {})

  partTwo = () => {
    let map = this.setup()
    const counts = Object.keys(this.insertions).reduce((o, key) => ({...o, [this.insertions[key]]: 0 }), {})

    for(let i=0; i<this.cycles2; i++) {
      const newMap = this.createMap()
      Object.entries(map).forEach(([replace, count]) => {
        const toInsert = this.insertions[replace]
        if (!toInsert) return
        newMap[`${replace[0]}${toInsert}`] += count
        newMap[`${toInsert}${replace[1]}`] += count
        counts[toInsert] += count
      })
      map = newMap
    }
    return this.mostMinusLeast(counts)
  }

  solve = () => {
    console.log('Part One: ', this.partOne())
    console.log('Part Two: ', this.partTwo())
  }
}

const solver = new Problems
solver.solve()
