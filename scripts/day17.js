import d3 from 'd3'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import './day17.scss'


const currentDay = 17

const maximum = 10000
const data = d3.range(40).map(() => parseInt(Math.random() * maximum))

const svgArea = document.querySelectorAll('svg')[currentDay - 1]

const yScale = d3.scaleLinear().domain([0, maximum]).range([0, 390])

const renderChart = () => {
  const lineSelection = d3.select(svgArea).selectAll('rect')
    .data(data)
    .enter()

  lineSelection
    .append('rect')
    .attr({
      width: 8,
      height: yScale,
      fill: d => d3.extent(data).indexOf(d) === -1 ? '#4A90E2' : '#D0021B',
      x: (_, i) => 10 * i,
      y: d => 370 - yScale(d)
    })
  lineSelection
    .append('text')
    .attr({
      x: (_, i) => 10 * i + 4,
      y: 372,
      'font-size': 10,
      'writing-mode': 'tb'
    })
    .text(d => d)
}

class NumbersDisplayArea extends Component {
  onShowChart() {
    renderChart()
  }

  render() {
    return (
      <div>
        <h4>The smallest & biggest one?</h4>
        <div>
          <button
            onClick={this.onShowChart.bind(this)}
          >
            Display Chart
          </button>
        </div>
        {
          data.map((d, i) => (
            <p key={ i }>{ d }</p>
          ))
        }
      </div>
    )
  }
}

//React part
const newNode = document.querySelector('body')
  .insertBefore(
    document.createElement('div'),
    document.querySelectorAll('svg')[currentDay].parentNode
  )
newNode.id = `day${currentDay}Input`


ReactDOM.render(<NumbersDisplayArea />, newNode)
