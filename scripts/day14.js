//data from http://emeeks.github.io/d3ia/world.geojson
//curl xxxx -o newFileName
import d3 from 'd3'

import data from './day14_assets/world.json'
import './day14.scss'

const currentDay = 14
const svgWidth = 400
const svgHeight = 400

const svgArea = document.querySelectorAll('svg')[currentDay - 1]
svgArea.id = `day${currentDay}`
// const color = d3.scale.category20()

const projection = d3.geo.mercator()
  .scale(svgWidth / 6.28)
  .translate([svgWidth / 2, svgHeight / 2])
const geoPath = d3.geo.path().projection(projection)
d3.select(svgArea).selectAll('path')
  .data(data.features)
  .enter()
  .append('path')
  .attr({
    class: 'countries',
    d: geoPath,
    fill: 'red'
  })
