//projection reference https://github.com/mbostock/d3/wiki/Geo-Projections
//W:- E:+ N:+ S:-
import d3 from 'd3'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import mapPolygonData from './day14_assets/world.json'
import './day15.scss'

const currentDay = 15
const svgWidth = 400
const svgHeight = 400
const cityData = [
  { name: 'San Francisco', x: -122, y: 37 },
  { name: 'Tokyo', x: 139, y: 35 },
  { name: 'Shanghai', x: 121, y: 31 },
  { name: 'London', x: 0, y: 51 },
]

const svgArea = document.querySelectorAll('svg')[currentDay - 1]
svgArea.id = `day${currentDay}`

//Map part
function renderMap(isMercator) {
  d3.select(svgArea).selectAll('g')
    .remove()
  const projection = (isMercator ? d3.geo.mercator() : d3.geo.equirectangular())
    .scale(svgWidth / 6.28)
    .translate([svgWidth / 2, svgHeight / 2])
  const geoPath = d3.geo.path().projection(projection)
  d3.select(svgArea).append('g')
    .selectAll('path')
    .data(mapPolygonData.features)
    .enter()
    .append('path')
    .attr({
      class: 'countries',
      d: geoPath,
      fill: '#4A90E2'
    })
    .on('mouseout', function() { d3.select(this).attr('fill', '#4A90E2') })
    .on('mouseover', function() { d3.select(this).attr('fill', 'red') })
    .append('circle')
    //After bind the geo data, we can get the center position fromm geoPath.centroid
    //                                get the bind border points array from geoPath.bounds

  const citySelection = d3.select(svgArea).append('g')
    .selectAll('g')
    .data(cityData)
    .enter()
    .append('g')
    .attr('transform', d => `translate(${projection([d.x, d.y])[0]}, ${projection([d.x, d.y])[1]})`)

  citySelection.append('circle')
    .attr({
      r: 2,
      opacity: 0.5,
    })

  citySelection.append('text')
    .text(d => d.name)
    .attr({
      'font-size': 8,
      opacity: 0.8,
      dx: 2,
      dy: 2,
    })
}

renderMap(true)

//React part
const newNode = document.querySelector('body')
  .insertBefore(
    document.createElement('div'),
    document.querySelectorAll('svg')[currentDay].parentNode
  )
newNode.id = `day${currentDay}Input`
class InputWidget extends Component {

  constructor() {
    super()
    this.state = {
      isMercator: true
    }
  }

  onChangeMode() {
    const { isMercator } = this.state
    this.setState({ isMercator: !isMercator })
    renderMap(!isMercator)
  }

  render() {
    const { isMercator } = this.state

    return (
      <div className='input-area'>
        <button
          onClick={this.onChangeMode.bind(this)}
        >
          Change Projection Mode
        </button>
        <h2>
          {`Currently on ${isMercator ? 'mercator' : 'equirectangular'} mode`}
        </h2>
      </div>
    )
  }
}

ReactDOM.render(<InputWidget />,
  document.querySelector(`#day${currentDay}Input`))
