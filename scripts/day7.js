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
  .attr('transform', 'translate(' + 120 + ',' + 120 + ')')

const node = svgGroup
  .selectAll('circle')
  .data(nodes)
  .enter()
node
  .append('circle')
  .attr({
    'cx': d => d.x,
    'cy': d => d.y,
    'r': 9,
    'fill': (d, i) => color(i),
  })

svgGroup
  .selectAll('line')
  .data(tree.links(nodes))
  .enter()
  .append('line')
  .attr({
    'x1': d => d.source.x,
    'x2': d => d.target.x,
    'y1': d => d.source.y,
    'y2': d => d.target.y,
    'stroke': 'black',
    'stroke-width': 2
  })

node.append('text')
  .text(function(d) { return d.name })
  .attr({
    'x': d => d.x - 8,
    'y': d => d.y - 10,
    fill: '#22A6F5',
  })
