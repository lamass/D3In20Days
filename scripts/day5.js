import d3 from 'd3'


const currentDay = 5

const data = d3.range(8).map(() => Math.random())
const svgArea = document.querySelectorAll('svg')[currentDay - 1]

//pieLayout.value(d => d * d)
//kepp default value map: d => d
const pieLayout = d3.layout.pie()
const pie = pieLayout(data)

const color = d3.scaleCategory10
const extendColor = d3.scale.category20()
const arc = d3.svg.arc()
arc.outerRadius(100)
arc.innerRadius(20)

d3.select(svgArea)
  .append('g')
  .attr('transform', 'translate(200, 200)')
  .selectAll('path')
  .data(pie)
  .enter()
  .append('path')
  .attr('d', arc)
  .style('fill', (_, i) => color(i))
  .style('opacity', 0.5)
  .style('stroke', 'black')
  .style('stroke-width', '2px')
  .on('mouseenter', function(_, i) {
    d3.select(this)
      .transition()
      .duration(300)
      .style('fill', extendColor(10 + i))
  })
  .on('mouseleave', function(_, i) {
    d3.select(this)
      .transition()
      .duration(300)
      .style('fill', color(i))
  })
