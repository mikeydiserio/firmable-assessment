
import classnames from 'classnames'
import PropTypes from 'prop-types'
import IconBase from './IconBase'

const IconPlay = ({ className, ...rest }) => {
  const classes = classnames(
    'icon',
    'icon_play',
    className,
  )

  return (
    <IconBase className={classes}  viewBox="0 0 20 20"{...rest}><path className="path1" fill="#6D6D6D" fillRule="evenodd" d="M10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10zm-.99-7.244l3.48-2.262c.416-.27.42-.715 0-.988L9.01 7.244c-.416-.27-.76-.09-.76.41v4.692c0 .497.34.683.76.41z"/></IconBase>
  )
}

IconPlay.propTypes = {
  className: PropTypes.string,
}

IconPlay.defaultProps = {
  className: null,
}

export default IconPlay
/* eslint-enable */
