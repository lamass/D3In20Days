//day 2 target: normal barchart with axis
import d3 from 'd3'

const data = []
for (let i = 0; i < 90; i++) {
  data.push(Number.parseInt(Math.random() * 100))
}

const yScale = d3.scale.linear().domain([0, 100]).range([20, 360])

const svgArea = document.querySelectorAll('svg')[1]
d3.select(svgArea).selectAll('rect')
  .data(data)
  .enter()
  .append('rect')
  .attr({
    height: d => yScale(d),
    width: 4,
    x: (_, i) => i * 4,
    y: d => 360 - yScale(d),
    fill: '#4A90E2'
  })
  //Impletation of the :hover
  .on('mouseover', function() {
    d3.select(this)
      .attr('fill', '#03336B')
  })
  .on('mouseout', function() {
    d3.select(this)
      .attr('fill', '#4A90E2')
  })
