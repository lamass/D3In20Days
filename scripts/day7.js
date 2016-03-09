import d3 from 'd3'


const currentDay = 7
const data = {
  name: 'root',
  children: [
    {name: 'leaf1'},
    {name: 'leaf2'},
    {name: 'leaf3'},
    {name: 'leaf4'},
  ]
}
const svgArea = document.querySelectorAll('svg')[currentDay - 1]
const color = d3.scale.category10()

const tree = d3.layout.tree()
  .size([150, 150])

const nodes = tree.nodes(data)

const svgGroup = d3.select(svgArea).append('g')
  .attr('transform', 'translate(' + 200 + ',' + 200 + ')')

const node = svgGroup
  .selectAll('circle')
  .data(nodes)
  .enter()
node
  .append('circle')
  .attr({
    'cx': d => d.x,
    'cy': d => d.x,
    'r': 9,
    'fill': (d, i) => color(i),
  })
// node.append('text')
//   .attr('dy', '.31em')
//   .attr('text-anchor', function(d) { return d.x < 180 ? 'start' : 'end' })
//   .attr('transform', function(d) { return d.x < 180 ? 'translate(8)' : 'rotate(180)translate(-8)' })
//   .text(function(d) { return d.name })

svgGroup
  .selectAll('line')
  .data(tree.links(nodes))
  .enter()
  .append('line')
  .attr({
    'x1': d => d.source.x,
    'x2': d => d.target.x,
    'y1': d => d.source.x,
    'y2': d => d.target.x,
    'stroke': 'black',
    'stroke-width': 2
  })
