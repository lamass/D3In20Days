//day 2 target: normal barchart with axis
import d3 from 'd3'

const data = []
for (let i = 0; i < 90; i++) {
  data.push(Number.parseInt(Math.random() * 100))
}

const xScale = d3.scaleLinear().domain([0, 90]).range([0, 360])
const yScale = d3.scaleLinear().domain([0, 100]).range([0, 360])
const yAxisScale = d3.scaleLinear().domain([0, 100]).range([360, 0])

const xLeftPadding = 32
const yTopPadding = 15

const svgArea = document.querySelectorAll('svg')[1]
d3.select(svgArea).selectAll('rect')
  .data(data)
  .enter()
  .append('rect')
  .attr('height', d=> yScale(d))
  .attr('width', 4)
  .attr('x', (_, i) => xScale(i) + xLeftPadding)
  .attr('y', d=> 360 - yScale(d) + yTopPadding)
  .attr('fill', '#4A90E2')
  //Impletation of the :hover
  .on('mouseover', function() {
    d3.select(this)
      .attr('fill', '#03336B')
  })
  .on('mouseout', function() {
    d3.select(this)
      .attr('fill', '#4A90E2')
  })

const xAxis = d3.axisBottom()
  .scale(xScale)
d3.select(svgArea)
  .append('g')
  .call(xAxis)
  .attr('id', 'xAxis')
  .attr('transform', `translate(${xLeftPadding}, ${360 + yTopPadding})`)
  .attr('fill', 'none')
  .attr('stroke', 'black')

const yAxis = d3.axisLeft()
  .scale(yAxisScale)
d3.select(svgArea)
  .append('g')
  .call(yAxis)
  .attr('id', 'yAxis')
  .attr('transform', `translate(${xLeftPadding}, ${yTopPadding})`)
  .attr('fill', 'none')
  .attr('stroke', 'black')
