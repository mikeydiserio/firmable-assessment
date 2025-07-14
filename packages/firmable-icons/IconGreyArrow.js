
import classnames from 'classnames'
import PropTypes from 'prop-types'
import IconBase from './IconBase'

const IconGreyArrow = ({ className, ...rest }) => {
  const classes = classnames(
    'icon',
    'icon--greyarrow',
    className,
  )

  return (
    <IconBase className={classes} viewBox="0 0 12 18" xmlns="http://www.w3.org/2000/svg"{...rest}><title>E9D680E8-7A03-4459-8D47-CC3B64719D47</title><path className="path1" d="M0 15.87L6.87 9 0 2.115 2.115 0l9 9-9 9z" fill="#C8C8C8" fillRule="evenodd"/></IconBase>
  )
}

IconGreyArrow.propTypes = {
  className: PropTypes.string,
}

export default IconGreyArrow
/* eslint-enable */
