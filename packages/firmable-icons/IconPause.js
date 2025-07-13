
import classnames from 'classnames'
import PropTypes from 'prop-types'
import IconBase from './IconBase'

const IconPause = ({ className, ...rest }) => {
  const classes = classnames(
    'icon',
    'icon--pause',
    className,
  )

  return (
    <IconBase className={classes} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8"{...rest}><path className="path1" d="M4-.002c-2.216 0-4 1.784-4 4s1.784 4 4 4 4-1.784 4-4-1.784-4-4-4m-1.5 2.5h1v3h-1v-3m2 0h1v3h-1v-3" fill="#4d4d4d"/></IconBase>
  )
}

IconPause.propTypes = {
  className: PropTypes.string,
}

export default IconPause
/* eslint-enable */
