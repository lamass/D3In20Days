import d3 from 'd3'

import './home.scss'

const titleArray = []
for (let i = 1; i < 21; i++) {
  titleArray.push(`day ${i}`)
}

const areaTags = d3.select('body').selectAll('div')
  .data(titleArray)
  .enter()
  .append('div')
  .attr('class', 'main-area')

areaTags.append('p').text(d => d)
areaTags.append('svg')

require ('./day1.js')
