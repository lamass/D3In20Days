import d3 from 'd3'


const currentDay = 4

const randomPos = maximum => Number.parseInt(Math.random() * maximum)
//showcase width 400px same as height
const data = d3.range(20).map(() => [randomPos(400), randomPos(400)])

const color = d3.scale.category10()
const svgArea = document.querySelectorAll('svg')[currentDay - 1]

function dragged(d) {
  d[0] = d3.event.x
  d[1] = d3.event.y
  d3.select(this)
    .attr('transform', `translate (${d})`)
}

const drag = d3.behavior.drag()
  .origin(function(d) { return {x: d[0], y: d[1]} })
  .on('drag', dragged)

d3.select(svgArea).selectAll('circle')
  .data(data)
  .enter()
  .append('circle')
  .attr({
    transform: d =>`translate (${d})`,
    r: 20,
    fill: (_, i) => color(i)
  })
  .call(drag)

// not work => drag(d3.select(svgArea).selectAll('circle'))
