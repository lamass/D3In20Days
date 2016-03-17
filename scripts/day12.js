import d3 from 'd3'


const currentDay = 12

const data = {
  'nodes': [
    { name: 'Web development', key: 0 },
    { name: 'Front-end', key: 1 },
    { name: 'Back-end', key: 1 },
    { name: 'HTML', key: 2 },
    { name: 'CSS', key: 2 },
    { name: 'Javascript', key: 2 },
    { name: 'Transitions', key: 3 },
    { name: 'Layout', key: 3 },
    { name: 'Frameworks', key: 3 },
    { name: 'ES6', key: 3 },
  ],
  'links': [
    { 'source': 1, 'target': 0 },
    { 'source': 2, 'target': 0 },
    { 'source': 3, 'target': 1 },
    { 'source': 4, 'target': 1 },
    { 'source': 5, 'target': 1 },
    { 'source': 6, 'target': 4 },
    { 'source': 7, 'target': 4 },
    { 'source': 8, 'target': 5 },
    { 'source': 9, 'target': 5 },
  ]
}

const svgArea = document.querySelectorAll('svg')[currentDay - 1]
const color = d3.scale.category20()

const force = d3.layout.force()
  //The charge is the forece between nodes.
  .charge(-320)
  .linkDistance(80)
  .size([400, 400])

force.nodes(data.nodes)
  .links(data.links)
  .start()

const link = d3.select(svgArea).selectAll('line')
  .data(data.links)
  .enter()
  .append('line')
  .attr({
    stroke: '#4A90E2',
    'stroke-opacity': 0.5,
    'stroke-width': 2
  })

const nodeSelection = d3.select(svgArea).selectAll('circle')
  .data(data.nodes)
  .enter()
  .append('g')
  .call(force.drag)

nodeSelection.append('circle')
  .attr({
    fill: (d) => color(d.key),
    r: 15,
  })
nodeSelection.append('text')
  .text(d => d.name)
  .attr({
    'font-size': 8,
    dy: 2
  })

force.on('tick', function() {
  link.attr('x1', d=> d.source.x)
      .attr('y1', d=> d.source.y)
      .attr('x2', d=> d.target.x)
      .attr('y2', d=> d.target.y)

  nodeSelection.attr({
    transform: d => `translate(${d.x} ${d.y})`
  })
})
