//thanks to https://github.com/codeforamerica/click_that_hood
import d3 from 'd3'

import data from './day20_assets/boston.geojson'
import './day20.scss'

const currentDay = 20
const svgWidth = 400
const svgHeight = 400

const svgArea = document.querySelectorAll('svg')[currentDay - 1]
svgArea.id = `day${currentDay}`
// const color = d3.scale.category20()

const projection = d3.geo.conicEqualArea()
  // .scale(200)
  // .translate([svgWidth, -svgHeight])
const geoPath = d3.geo.path().projection(projection)
d3.select(svgArea).append('g')
  .selectAll('path')
  .data(data.features)
  .enter()
  .append('path')
  .attr({
    class: 'locations',
    d: geoPath,
    fill: 'red'
  })
