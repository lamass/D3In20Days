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
require ('./day2.js')
require ('./day3.js')
require ('./day4.js')
require ('./day5.js')
require ('./day6.js')
require ('./day7.js')
require ('./day8.js')
require ('./day9.js')
require ('./day10.js')
require ('./day11.js')
require ('./day12.js')
require ('./day13.js')
require ('./day14.js')
require ('./day15.js')
require ('./day16.js')
require ('./day17.js')
require ('./day18.js')
require ('./day19.js')
require ('./day20.js')
