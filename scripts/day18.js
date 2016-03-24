import d3 from 'd3'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import './day18.scss'

let data = []
const currentDay = 18

//React part
const newNode = document.querySelector('body')
  .insertBefore(
    document.createElement('div'),
    document.querySelectorAll('svg')[currentDay].parentNode
  )
newNode.id = `day${currentDay}Input`

//Deal with data
d3.csv('./dataFromWorldBank.csv',
  d => d,
  (_, rows) => {
    const filteredRows = rows.filter(d => {
      let counter = 0
      for (let i = 0; i < 54; i++) {
        if (d[`${1960 + i}`] === '') {
          counter++
        }
      }
      return counter < 10
    })
    filteredRows.forEach(d => {
      let obj = {}
      obj.name = d['Indicator Name']
      obj.values = []
      for (let i = 0; i < 54; i++) {
        if (d[`${1960 + i}`] !== '') {
          obj.values.push({ value: +d[`${1960 + i}`], year: i })
        }
      }
      data.push(obj)
    })
    ReactDOM.render(<Controller />, newNode)
  }
)
const svgArea = document.querySelectorAll('svg')[currentDay - 1]

function updateChart(values) {
  d3.select(svgArea).select('path')
    .remove()
  const yScale = d3.scale.linear()
    .domain(d3.extent(values, d => d.value)).range([0, 390])

  const lineGenerator = d3.svg.line()
    .x(d => d.year * 7)
    .y(d => 400 - yScale(d.value))
    // .interpolate('linear')
    .interpolate('basis')
  d3.select(svgArea).append('path')
    .datum(values)
    .attr({
      'd': lineGenerator,
      'stroke': '#4A90E2',
      'fill': 'none'
    })
}

class Controller extends Component {
  constructor() {
    super()
    this.state = { index: 0 }
  }

  componentDidMount() {
    updateChart(data[0].values)
  }

  onNavigate(isNext) {
    const { index } = this.state

    let newIndex = index + (isNext ? 1 : -1)
    newIndex = newIndex < 0 ? data.length - 1 : newIndex
    newIndex = newIndex > data.length - 1 ? 0 : newIndex
    this.setState({ index: newIndex })
    updateChart(data[newIndex].values)
  }

  render() {
    const { index } = this.state
    return (
      <div>
        <h1>{data[index].name}</h1>
        <button onClick={this.onNavigate.bind(this, false)}>{'<'}</button>
        <button onClick={this.onNavigate.bind(this, true)}>{'>'}</button>
      </div>
    )
  }
}
