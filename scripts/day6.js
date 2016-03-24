import d3 from 'd3'
import './day6.scss'

const currentDay = 6

const data = [{
  time: 8, type: 'Sleep'
}, {
  time: 2, type: 'Exersie'
}, {
  time: 8, type: 'Work'
}, {
  time: 3, type: 'Eat & relax'
}, {
  time: 3, type: 'Study'
}]
const svgArea = document.querySelectorAll('svg')[currentDay - 1]

//pieLayout.value(d => d * d)
//kepp default value map: d => d
const pieLayout = d3.layout.pie().value(d => d.time)

const color = d3.scale.category10()
const arc = d3.svg.arc()
let tooltip
arc.outerRadius(130)
arc.innerRadius(80)
let point = [0, 0]

d3.select(svgArea)
  .on('mousemove', function() {
    point = d3.mouse(this)
  })
  .classed({[`day${currentDay}`]: true})
  .append('g')
  .attr('transform', 'translate(200, 200)')
  .selectAll('path')
  .data(pieLayout(data))
  .enter()
  .append('path')
  .attr('d', arc)
  .style('fill', (_, i) => color(i))
  .style('opacity', 0.5)
  .style('stroke', 'black')
  .style('stroke-width', '2px')
  .on('mouseenter', function(d, i) {
    d3.select(this)
      .transition()
      .duration(300)
      .style('fill', color(data.length + i))
    d3.select('#day6 .tooltip-type')
      .text(data[i].type)
    d3.select('#day6 .tooltip-time')
      .text(`: ${data[i].time} hours`)
    tooltip
      .style('display', `inline-block`)
  })
  .on('mousemove', () => {
    tooltip
      .style('transform', `translate(${point[0]}px, ${point[1]}px)`)
  })
  .on('mouseleave', function(_, i) {
    d3.select(this)
      .transition()
      .duration(300)
      .style('fill', color(i))
    tooltip
      .style('display', `none`)
  })

const descrSelection = d3.select(svgArea)
  .append('g')
  .selectAll('g')
  .data(data)
  .enter()
  .append('g')
  .attr('transform', (_, i) => `translate(160, ${170 + 15 * i})`)

descrSelection
  .append('rect')
  .attr({
    width: 10,
    height: 10,
    fill: (_, i) => color(i)
  })

descrSelection
  .append('text')
  .text(d => d.type)
  .attr({
    width: 10,
    height: 10,
    fill: (_, i) => color(i),
    transform: (_, i) => `translate(15, 10)`
  })

const newNode = document.querySelector('.day6').parentNode
  .insertBefore(
    document.createElement('div'),
    document.querySelector('.day6')
  )

tooltip = d3.select(newNode)
  .attr('id', 'day6')
  .classed({'tooltip': true})

tooltip.append('text')
  .classed({'tooltip-type': true})

tooltip.append('text')
  .classed({'tooltip-time': true})
