const animationDuration = 350
const shouldResize = true

// Nodes
const nodeWidth = 164
const nodeHeight = 92
const nodeSpacing = 12
const nodePaddingX = 12
const nodePaddingY = 12
const avatarWidth = 48
const nodeBorderRadius = 10
const margin = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 20,
}

// Lines
const lineType = 'angle'
const lineDepthY = 120 /* Height of the line for child nodes */

// Colors
const backgroundColor = '#fff'
const borderColor = '#c9c9c9'
const nameColor = '#222d38'
const titleColor = '#617080'
const reportsColor = '#92A0AD'
const nodeStatusColor = "#2290F9"

const config = {
  margin,
  animationDuration,
  nodeWidth,
  nodeHeight,
  nodeSpacing,
  nodePaddingX,
  nodePaddingY,
  nodeBorderRadius,
  avatarWidth,
  lineType,
  lineDepthY,
  backgroundColor,
  borderColor,
  nameColor,
  titleColor,
  reportsColor,
  shouldResize,
  nodeStatusColor
}

module.exports = config
