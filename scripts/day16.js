import d3 from 'd3'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import mapPolygonData from './day14_assets/world.json'
import './day16.scss'

const currentDay = 16
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
d3.select(svgArea).selectAll('g')
  .remove()
const projection = d3.geo.orthographic()
  .scale(svgWidth / 6.28 * 10 / 6)
  .translate([svgWidth / 2, svgHeight / 2])
  .center([0, 0])
  .clipAngle(90)
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

const citySelection = d3.select(svgArea).append('g')
  .selectAll('g')
  .data(cityData)
  .enter()
  .append('g')
  .attr('transform', d => `translate(${projection([d.x, d.y])[0]}, ${projection([d.x, d.y])[1]})`)
  .attr('class', 'city-selection')
  .style('display', d =>{
    return Math.abs(parseInt(d.x)) < 90 ? 'block' : 'none'
  })

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

const onZooming = () => {
  projection.translate(mapZoom.translate()).scale(mapZoom.scale())
  d3.select(svgArea).selectAll('path.countries')
    .attr('d', geoPath)
  d3.select(svgArea).selectAll('.city-selection')
    .attr('transform', d => `translate(${projection([d.x, d.y])[0]}, ${projection([d.x, d.y])[1]})`)
  //Hide ploygon in other side of earth
  //the result of projection.rotate() is a three dimensional array
  const currentRotate = projection.rotate()[0]
  d3.select(svgArea).selectAll('.city-selection')
    .style('display', d =>{
      return Math.abs(parseInt(d.x) + currentRotate) < 90 ? 'block' : 'none'
    })
}
const mapZoom = d3.behavior.zoom()
   .translate(projection.translate())
   .scale(projection.scale())
   .on('zoom', onZooming)
d3.select(svgArea).call(mapZoom)

const rotateScale = d3.scaleLinear()
  .domain([0, svgWidth])
  .range([-180, 180])
d3.select(svgArea)
  .on('mousedown', function() {
    d3.select(svgArea).on('mousemove', function() {
      const point = d3.mouse(this)
      projection.rotate([rotateScale(point[0], 0)])
      onZooming()
    })
  })
  .on('mouseup', () => {
    d3.select(svgArea).on('mousemove', null)
  })

//React part
const newNode = document.querySelector('body')
  .insertBefore(
    document.createElement('div'),
    document.querySelectorAll('svg')[currentDay].parentNode
  )
newNode.id = `day${currentDay}Input`

const zoomInRatio = 1.5
const zoomOutRatio = 0.75
class InputWidget extends Component {
  onZooming(isZoomIn) {
    mapZoom.scale(mapZoom.scale() * (isZoomIn ? zoomInRatio : zoomOutRatio))
      .translate([
        ((mapZoom.translate()[0] - svgWidth / 2) * (isZoomIn ? zoomInRatio : zoomOutRatio)) + svgWidth / 2,
        ((mapZoom.translate()[0] - svgHeight / 2) * (isZoomIn ? zoomInRatio : zoomOutRatio)) + svgHeight / 2
      ])
    onZooming()
  }

  render() {
    return (
      <div className='input-area'>
        <button onClick={this.onZooming.bind(this, true)}>
          Zoom in
        </button>
        <button onClick={this.onZooming.bind(this, false)}>
          Zoom out
        </button>
      </div>
    )
  }
}

ReactDOM.render(<InputWidget />,
  document.querySelector(`#day${currentDay}Input`))
