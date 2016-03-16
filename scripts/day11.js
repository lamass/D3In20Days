import d3 from 'd3'
import topojson from 'topojson'

//For generate polygon GEO data, demo:
// ogr2ogr \
//   -f GeoJSON \
//   -where "ADM0_A3 IN ('CHN')" \
//   subunits.json \
//   ne_10m_admin_0_map_subunits.shp

//For generate places GEO data, demo:
// ogr2ogr \
//   -f GeoJSON \
//   -where "ISO_A2 = 'CN' AND SCALERANK < 8" \
//   places.json \
//   ne_10m_populated_places.shp

//For generate topojson data, demo:
// topojson \
//   -o cn.json \
//   --id-property SU_A3 \
//   --properties name=NAME \
//   -- \
//   subunits.json \
//   places.json

import data from './day11_assets/us.json'


const currentDay = 11

const svgArea = document.querySelectorAll('svg')[currentDay - 1]

const subunits = topojson.feature(data, data.objects.subunits)
const projection = d3.geo.mercator()
    //Need to improve this translate & scale little adjusment stuff
    //Shouldn't be this kind of weird.
    .translate([620, 400])
    .scale(200)
const path = d3.geo.path().projection(projection).pointRadius(1)

d3.select(svgArea).selectAll('.subunit')
    .data(subunits.features)
  .enter().append('path')
    .attr({
      fill: '#4A90E2',
      d: path,
    })

// draw places
d3.select(svgArea).append('path')
  .datum(topojson.feature(data, data.objects.places))
  .attr('d', path)
  .attr('opacity', '0.6')
  .attr('class', 'place')

d3.select(svgArea).selectAll('.place-label')
  .data(topojson.feature(data, data.objects.places).features)
.enter().append('text')
  .attr('transform', d => `translate(${projection(d.geometry.coordinates)})`)
  .attr('dy', '.35em')
  .attr('dx', '1px')
  .style({
    'font-size': '3.5px',
    'opacity': '0.6',
  })
  .text(function(d) { return d.properties.name })
