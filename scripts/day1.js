import d3 from 'd3'

const data = [
  {
    value: 0,
    x: 50,
    y: 13,
  }, {
    value: 3,
    x: 150,
    y: 63,
  }, {
    value: 5,
    x: 250,
    y: 93,
  }, {
    value: 7,
    x: 100,
    y: 313,
  }, {
    value: 9,
    x: 150,
    y: 213,
  },
]

const valueRange = d3.extent(data, d => d.value)
const colorScale = d3.scale.linear().domain(valueRange).range([5, 100])

const svgArea = document.querySelectorAll('svg')[0]
d3.select(svgArea).selectAll('rect')
  .data(data)
  .enter()
  .append('circle')
  .attr({
    cx: d => d.x,
    cy: d => d.y,
    r: d => colorScale(d.value),
    fill: '#D0021B',
    opacity: 0.5,
  })
