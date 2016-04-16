//Find the better way to update data tomorrow
import d3 from 'd3'
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

import './day13.scss'

const currentDay = 13
//d3 part
const data = {
  'nodes': [
  ],
  'links': [
  ]
}
const color = d3.scaleCategory10
const svgArea = document.querySelectorAll('svg')[currentDay - 1]

const force = d3.layout.force()
  //The charge is the forece between nodes.
  .charge(-340)
  .linkDistance(80)
  .size([400, 400])

function configForceTick(link, node) {
  force.on('tick', function() {
    link.attr('x1', d=> d.source.x)
    .attr('y1', d=> d.source.y)
    .attr('x2', d=> d.target.x)
    .attr('y2', d=> d.target.y)

    node.attr({
      transform: d => `translate(${d.x} ${d.y})`
    })
  })
}

function updateForce() {
  d3.select(svgArea).selectAll('line')
    .remove()
  d3.select(svgArea).selectAll('g')
    .remove()

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

  const nodeSelection = d3.select(svgArea).selectAll('g')
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

  configForceTick(link, nodeSelection)
}

updateForce()
// React part
const newNode = document.querySelector('body')
  .insertBefore(
    document.createElement('div'),
    document.querySelectorAll('svg')[currentDay].parentNode
  )
newNode.id = `day${currentDay}`

class InputWidget extends Component {

  constructor() {
    super()
    this.state = {
      confirmed: false,
      text: '',
      nodeCounter: 0
    }
  }

  onConfirm() {
    const { text, nodeCounter } = this.state
    this.setState({ confirmed: true, nodeCounter: nodeCounter + 1 })
    data.nodes.push({ name: text, key: 1 })
    updateForce()
  }

  textChange() {
    this.setState({ text: this.refs.textInput.value })
  }

  onAddSibling() {
    const { text, nodeCounter } = this.state
    this.setState({ nodeCounter: nodeCounter + 1 })
    data.nodes.push({ name: text, key: 5 })
    updateForce()
  }

  onAddChild() {
    const { text, nodeCounter } = this.state
    this.setState({ nodeCounter: nodeCounter + 1 })
    data.nodes.push({ name: text, key: 2 })
    data.links.push({ 'source': nodeCounter, 'target': 0 })
    updateForce()
  }

  render() {
    const { confirmed, text } = this.state
    return (
      <div className='input-area'>
        <span className='placeholder'></span>
        <input
          onChange = {this.textChange.bind(this)}
          ref='textInput'
          type='text'
        />
        <button
          onClick={this.onConfirm.bind(this)}
          disabled={confirmed || text === ''}
        >
          Confirm
        </button>
        <button
          onClick={this.onAddSibling.bind(this)}
          disabled={!confirmed || text === ''}
        >
          Add sibling
        </button>
        <button
          onClick={this.onAddChild.bind(this)}
          disabled={!confirmed || text === ''}
        >
          Add child
        </button>
      </div>
    )
  }
}

InputWidget.propTypes = {
  confirmed: PropTypes.bool
}

ReactDOM.render(<InputWidget />, document.querySelector(`#day${currentDay}`))
