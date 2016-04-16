//Better demo of exit and transition
import d3 from 'd3'


const currentDay = 19

const svgArea = document.querySelectorAll('svg')[currentDay - 1]

function render(data) {
  const selection = d3.select(svgArea).selectAll('text')
    .data(data, d => d)

  selection.exit().remove()

  selection
    .attr({
      transform: (d, i) => `translate(${50 + i * 20}, 200)`
    })

  selection.enter().append('text')
    .text(d => d)
    .attr({
      transform: (d, i) => `translate(${50 + i * 20}, 200)`
    })
}

setInterval(() => {
  const data = 'abcdefghijklmn'.split('')
  const randomArr = d3.shuffle(data).slice(Number.parseInt(Math.random() * data.length))
  render(randomArr)
}, 2000)
