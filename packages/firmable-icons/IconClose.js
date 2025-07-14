
import classnames from 'classnames'
import PropTypes from 'prop-types'
import IconBase from './IconBase'

const IconClose = ({ className, ...rest }) => {
  const classes = classnames(
    'icon',
    'icon--close',
    className,
  )

  return (
    <IconBase className={classes} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18"{...rest}><path className="path1" fill="#B5B5B5" d="M17.9 1.9L16.1.1 9 7.2 1.9.1.1 1.9 7.2 9 .1 16.1l1.8 1.7L9 10.7l7.1 7.1 1.8-1.7L10.8 9z"/></IconBase>
  )
}

IconClose.propTypes = {
  className: PropTypes.string,
}

export default IconClose
/* eslint-enable */
