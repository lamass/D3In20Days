//https://bost.ocks.org/mike/map/
import d3 from 'd3'
import topojson from 'topojson'

import data from './day10_assets/cn.json'


const currentDay = 10

const svgArea = document.querySelectorAll('svg')[currentDay - 1]
//datum and data?
//datum bind data, but not calculate data join, so without enter & exit stuff

const subunits = topojson.feature(data, data.objects.subunits)
const projection = d3.geo.mercator()
    .translate([-290, 350])
    .scale(280)
//pointRadius ref:https://github.com/mbostock/d3/wiki/Geo-Paths#wiki-pointRadius
const path = d3.geo.path().projection(projection).pointRadius(1)

// The same as below
// d3.select(svgArea).append('path')
//   .datum(subunits)
//   .attr({
//     d: path
//   })
d3.select(svgArea).selectAll('.subunit')
    .data(subunits.features)
  .enter().append('path')
    .attr({
      fill: '#D0021B',
      d: path,
    })

// draw places
d3.select(svgArea).append('path')
  .datum(topojson.feature(data, data.objects.places))
  .attr('d', path)
  .attr('opacity', '0.6')
  .attr('class', 'place')

d3.select(svgArea).selectAll('.place-label')
  .data(topojson.feature(data, data.objects.places).features)
.enter().append('text')
  .attr('transform', d => `translate(${projection(d.geometry.coordinates)})`)
  .attr('dy', '.35em')
  .attr('dx', '1px')
  .style({
    'font-size': '3.5px',
    'opacity': '0.6',
  })
  .text(function(d) { return d.properties.name })
