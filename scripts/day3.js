//day 3 target: transitions 101
import d3 from 'd3'

const svgArea = document.querySelectorAll('svg')[2]
d3.select(svgArea)
  .attr('id', 'day3')
  .append('rect')
  .attr({
    width: 100,
    height: 30,
    x: 100,
    y: 100
  })

const transition = () => {
  d3.select('#day3 rect')
  .transition()
  .duration(2490)
  .attr('fill', '#4A90E2')
  .transition()
  .duration(2490)
  .attr('width', 400)
  .transition()
  .duration(2490)
  .attr('fill', '#000')
  .transition()
  .duration(2490)
  .attr('width', 100)
}

transition()
setInterval(() => {
  transition()
}, 10 * 1000)
