const d3 = require('d3')
const { wrapText, helpers, covertImageToBase64 } = require('../utils')
const renderLines = require('./renderLines')
const exportOrgChartImage = require('./exportOrgChartImage')
const exportOrgChartPdf = require('./exportOrgChartPdf')
const onClick = require('./onClick')
const iconLink = require('./components/iconLink')
const supervisorIcon = require('./components/supervisorIcon')
const CHART_NODE_CLASS = 'org-chart-node'
const PERSON_LINK_CLASS = 'org-chart-person-link'
const PERSON_NAME_CLASS = 'org-chart-person-name'
const PERSON_TITLE_CLASS = 'org-chart-person-title'
const PERSON_HIGHLIGHT = 'org-chart-person-highlight'
const PERSON_REPORTS_CLASS = 'org-chart-person-reports'

function render(config) {
  const {
    svgroot,
    svg,
    tree,
    animationDuration,
    nodeWidth,
    nodeHeight,
    nodePaddingX,
    nodePaddingY,
    nodeBorderRadius,
    backgroundColor,
    nameColor,
    titleColor,
    reportsColor,
    borderColor,
    avatarWidth,
    lineDepthY,
    treeData,
    sourceNode,
    onPersonLinkClick,
    loadImage,
    downloadImageId,
    downloadPdfId,
    nodeStatusColor,
    elemWidth,
    margin,
    onConfigChange,
  } = config

  // Compute the new tree layout.
  const nodes = tree.nodes(treeData).reverse()
  const links = tree.links(nodes)
  config.links = links
  config.nodes = nodes

  // Normalize for fixed-depth.
  nodes.forEach(function (d) {
    d.y = d.depth * lineDepthY
  })

  // Update the nodes
  const node = svg.selectAll('g.' + CHART_NODE_CLASS).data(
    nodes.filter((d) => d.id),
    (d) => d.id
  )

  const parentNode = sourceNode || treeData

  svg.selectAll('#supervisorIcon').remove()

  supervisorIcon({
    svg: svg,
    config,
    treeData,
    x: 70,
    y: -24,
  })

  // Enter any new nodes at the parent's previous position.
  const nodeEnter = node
    .enter()
    .insert('g')
    .attr('class', CHART_NODE_CLASS)
    .attr('transform', `translate(${parentNode.x0}, ${parentNode.y0})`)

  // Person Card Shadow
  nodeEnter
    .append('rect')
    .attr('width', nodeWidth)
    .attr('height', nodeHeight)
    .attr('fill', backgroundColor)
    .attr('stroke', borderColor)
    .attr('rx', nodeBorderRadius)
    .attr('ry', nodeBorderRadius)
    .attr('fill-opacity', 0.05)
    .attr('stroke-opacity', 0.025)
    .attr('filter', 'url(#boxShadow)')

  // Person Card Container
  nodeEnter
    .append('rect')
    .attr('class', (d) => (d.isHighlight ? `${PERSON_HIGHLIGHT} box` : 'box'))
    .attr('width', nodeWidth)
    .attr('height', nodeHeight)
    .attr('id', (d) => d.id)
    .attr('fill', backgroundColor)
    .attr('stroke', borderColor)
    .attr('rx', nodeBorderRadius)
    .attr('ry', nodeBorderRadius)

  nodeEnter
    .append('path')
    .attr(
      'd',
      `M${nodeBorderRadius} 0 h${
        nodeWidth - 2 * nodeBorderRadius
      } q${nodeBorderRadius},0 ${nodeBorderRadius},${nodeBorderRadius} h-${nodeWidth} q0,-${nodeBorderRadius} ${nodeBorderRadius},-${nodeBorderRadius}`
    )
    .attr('fill', (d) => d.nodeStatusColor || nodeStatusColor)
    .attr('stroke', (d) => d.nodeStatusColor || nodeStatusColor)
    .attr('stroke-width', 0.1)

  const namePos = {
    x: nodePaddingX + avatarWidth + (nodePaddingX / 2) * 1.8,
    y: 2 * nodePaddingY,
  }

  const avatarPos = {
    x: nodePaddingX,
    y: nodePaddingY + 1.8 * (nodePaddingY / 2),
  }

  const circleProps = {
    x: nodeWidth / 1.25,
    y: nodeHeight / 1.25,
  }

  // Person's Name
  nodeEnter
    .append('foreignObject')
    .attr('x', namePos.x)
    .attr('y', namePos.y)
    .attr('width', 110)
    .attr('height', avatarWidth)
    .append('xhtml:div')
    .style('width', '90%')
    .style('overflow', 'hidden')
    .style('font-size', '13px')
    .style('text-overflow', 'ellipsis')
    .style('font-weight', 400)
    .text((d) => d.person.name)

  const heightForTitle = 60 // getHeightForText(d.person.title)

  // Person's Reports
  nodeEnter
    .append('text')
    .attr('class', PERSON_REPORTS_CLASS)
    .attr('x', nodePaddingX)
    .attr('y', nodePaddingY + avatarWidth*1.1 + (nodePaddingY / 2) * 3.6)
    .attr('dy', '.9em')
    .style('font-size', 12)
    .style('font-weight', 400)
    .style('fill', reportsColor)
    .text(helpers.getTextForTitle)

  //Chevron iconLink
  const chevron = nodeEnter
    .append('g')
    .attr('id', (d) => `chevron-${d.person.id}`)
    .style('cursor', 'pointer')
    .attr('display', (d) => (d.person.hasChild ? '' : 'none'))
    .attr('transform', `rotate(180,${circleProps.x},${circleProps.y})`)
    .on('click', onClick(config))

  chevron
    .append('circle')
    .attr('cx', circleProps.x)
    .attr('cy', circleProps.y)
    .attr('r', 10)
    .attr('fill', 'white')
    .attr('stroke', '#A0AEC0')
  chevron
    .append('text')
    .attr('stroke', 'black')
    .html('&#94;')
    .style('font-weight', 400)
    .style('font-size', 16)
    .attr('x', 126)
    .attr('y', 81)

  // Person's Avatar
  nodeEnter
    .append('image')
    .attr('id', (d) => `image-${d.id}`)
    .attr('width', avatarWidth)
    .attr('height', avatarWidth)
    .attr('x', avatarPos.x)
    .attr('y', avatarPos.y)
    .attr('stroke', borderColor)
    .attr('s', (d) => {
      d.person.hasImage
        ? d.person.avatar
        : loadImage(d).then((res) => {
            covertImageToBase64(res, function (dataUrl) {
              d3.select(`#image-${d.id}`).attr('href', dataUrl)
              d.person.avatar = dataUrl
            })
            d.person.hasImage = true
            return d.person.avatar
          })
    })
    .attr('src', (d) => d.person.avatar)
    .attr('href', (d) => d.person.avatar)

  // Transition nodes to their new position.
  const nodeUpdate = node
    .transition()
    .duration(animationDuration)
    .attr('transform', (d) => `translate(${d.x},${d.y})`)

  nodeUpdate
    .select('rect.box')
    .attr('fill', backgroundColor)
    .attr('stroke', borderColor)

  // Transition exiting nodes to the parent's new position.
  const nodeExit = node
    .exit()
    .transition()
    .duration(animationDuration)
    .attr('transform', (d) => `translate(${parentNode.x},${parentNode.y})`)
    .remove()

  // Update the links
  const link = svg.selectAll('path.link').data(links, (d) => d.target.id)

  // Wrap the title texts
  /* const wrapWidth = 82
  svg.selectAll('text.unedited.' + PERSON_NAME_CLASS).call(wrapText, wrapWidth)
  svg.selectAll('text.unedited.' + PERSON_TITLE_CLASS).call(wrapText, wrapWidth) */

  // Render lines connecting nodes
  renderLines(config)

  // Stash the old positions for transition.
  nodes.forEach(function (d) {
    d.x0 = d.x
    d.y0 = d.y
  })

  var nodeLeftX = -70
  var nodeRightX = 70
  var nodeY = 200
  nodes.map((d) => {
    nodeLeftX = d.x < nodeLeftX ? d.x : nodeLeftX
    nodeRightX = d.x > nodeRightX ? d.x : nodeRightX
    nodeY = d.y > nodeY ? d.y : nodeY
  })

  config.nodeRightX = nodeRightX
  config.nodeY = nodeY
  config.nodeLeftX = nodeLeftX * -1

  d3.select(downloadImageId).on('click', function () {
    exportOrgChartImage(config)
  })

  d3.select(downloadPdfId).on('click', function () {
    exportOrgChartPdf(config)
  })
  onConfigChange(config)
}
module.exports = render
