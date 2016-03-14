import d3 from 'd3'


const currentDay = 9

const data = {
  'nodes': [
    {},
    {},
    {},
    {},
    {},
    {},
  ],
  'links': [
    {'source': 1, 'target': 0},
    {'source': 2, 'target': 0},
    {'source': 3, 'target': 0},
    {'source': 4, 'target': 1},
    {'source': 5, 'target': 2},
    {'source': 5, 'target': 2},
  ]
}

const svgArea = document.querySelectorAll('svg')[currentDay - 1]
const color = d3.scale.category20()

const force = d3.layout.force()
  .charge(-120)
  .linkDistance(30)
  .size([400, 400])

force.nodes(data.nodes)
  .links(data.links)
  .start()

const link = d3.select(svgArea).selectAll('line')
  .data(data.links)
  .enter()
  .append('line')
  .attr({
    stroke: '#999',
    'stroke-opacity': 0.5,
    'stroke-width': 3
  })

const node = d3.select(svgArea).selectAll('circle')
  .data(data.nodes)
  .enter()
  .append('circle')
  .attr({
    fill: (d, i) => color(i),
    r: 5,
  })
  .call(force.drag)

force.on('tick', function() {
  link.attr('x1', function(d) { return d.source.x })
      .attr('y1', function(d) { return d.source.y })
      .attr('x2', function(d) { return d.target.x })
      .attr('y2', function(d) { return d.target.y })

  node.attr('cx', function(d) { return d.x })
      .attr('cy', function(d) { return d.y })
})
