
import classnames from 'classnames'
import PropTypes from 'prop-types'
import IconBase from './IconBase'

const IconAdd = ({ className, ...rest }) => {
  const classes = classnames(
    'icon',
    'icon--add',
    className,
  )

  return (
    <IconBase className={classes} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22.4 22.4" enableBackground="new 0 0 22.4 22.4"{...rest}><path className="path1" fill="#FFF" d="M20.7 12h-8.1v8.8c0 .9-.6 1.7-1.6 1.7-.9 0-1.6-.8-1.6-1.7V12H1.7C.8 12 0 11.3 0 10.4c0-.9.8-1.6 1.7-1.6h7.8V1.7C9.5.8 10.1 0 11 0s1.6.8 1.6 1.7v7.1h8.1c.9 0 1.7.6 1.7 1.6 0 .9-.7 1.6-1.7 1.6"/></IconBase>
  )
}

IconAdd.propTypes = {
  className: PropTypes.string,
}

export default IconAdd
/* eslint-enable */
