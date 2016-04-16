//Better demo of exit and transition
import d3 from 'd3'

import './day19.scss'


const currentDay = 19

const svgArea = document.querySelectorAll('svg')[currentDay - 1]
svgArea.id = `day${currentDay}`

function render(data) {
  const selection = d3.select(svgArea).selectAll('text')
    .data(data, d => d)

  selection.exit()
    .transition()
    .duration(1000)
    .attr({
      transform: (d, i) => `translate(${50 + i * 20}, 400)`
    })
    .remove()

  selection
    .transition()
    .duration(1000)
    .attr({
      fill: '#0086b3',
      transform: (d, i) => `translate(${50 + i * 20}, 200)`
    })

  selection.enter().append('text')
    .text(d => d)
    .attr({
      transform: (d, i) => `translate(${50 + i * 20}, 200)`
    })
}

function refresh() {
  const data = 'abcdefghijk'.split('')
  const randomArr = d3.shuffle(data).slice(Number.parseInt(Math.random() * data.length))
  render(randomArr)
}
refresh()

setInterval(() => {
  refresh()
}, 2000)
