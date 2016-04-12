//Better demo of exit and transition
import d3 from 'd3'


const currentDay = 19

const svgArea = document.querySelectorAll('svg')[currentDay - 1]
let data = ['a', 'b', 'e', 'f', 'g']
d3.select(svgArea).selectAll('text')
  .data(data, d => d)
  .enter()
  .append('text')
  .text(d => d)
  .attr({
    transform: (d, i) => `translate(${50 + i * 20}, 200)`
  })

setTimeout(() => {
  data = 'ccccccccccccccccccc'.split('').concat('g')
  d3.select(svgArea).selectAll('text')
    .data(data, d => d)
    .exit()
    .remove()
}, 2000)
