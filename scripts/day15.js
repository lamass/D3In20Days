//W:- E:+ N:+ S:-
import d3 from 'd3'

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

const projection = d3.geo.mercator()
  .scale(svgWidth / 6.28)
  .translate([svgWidth / 2, svgHeight / 2])
const geoPath = d3.geo.path().projection(projection)
d3.select(svgArea).selectAll('path')
  .data(mapPolygonData.features)
  .enter()
  .append('path')
  .attr({
    class: 'countries',
    d: geoPath
  })

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
