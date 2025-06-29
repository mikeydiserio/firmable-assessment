import React from 'react'
import PropTypes from 'prop-types'

const IconBase = (props) => {
  const { style, children, size } = props
  const defaultStyles = {
    verticalAlign: 'middle',
  }
  const svgProps = {
    fill: 'currentColor',
    width: size,
    height: size,
  }

  return (
    <svg
      {...svgProps}
      {...props}
      preserveAspectRatio="xMidYMid meet"
      style={{ ...defaultStyles, ...style }}
    >
      {children}
    </svg>
  )
}

IconBase.defaultProps = {
  size: '100%',
}

IconBase.propTypes = {
  children: PropTypes.node,
  size: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  style: PropTypes.object,
}

IconBase.defaultProps = {
  children: null,
  style: {},
}

export default IconBase
