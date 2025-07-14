
import classnames from 'classnames'
import PropTypes from 'prop-types'
import IconBase from './IconBase'

const IconTwitter = ({ className, ...rest }) => {
  const classes = classnames(
    'icon',
    'icon--twitter',
    className,
  )

  return (
    <IconBase className={classes} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 12"{...rest}><path className="path1" fill="#888" fillRule="evenodd" d="M12.35 1.898A3.016 3.016 0 0 0 13.613.22c-.555.348-1.17.6-1.824.736A2.801 2.801 0 0 0 9.693 0C8.107 0 6.82 1.356 6.82 3.03c0 .237.025.468.074.69C4.508 3.593 2.39 2.387.975.554a3.142 3.142 0 0 0-.39 1.523c0 1.051.508 1.979 1.279 2.522A2.749 2.749 0 0 1 .563 4.22v.038c0 1.468.99 2.692 2.303 2.97a2.738 2.738 0 0 1-1.297.053c.366 1.203 1.427 2.08 2.683 2.103A5.576 5.576 0 0 1 0 10.64 7.826 7.826 0 0 0 4.403 12c5.283 0 8.172-4.616 8.172-8.62 0-.13-.003-.261-.008-.391A6.023 6.023 0 0 0 14 1.42a5.513 5.513 0 0 1-1.65.477z"/></IconBase>
  )
}

IconTwitter.propTypes = {
  className: PropTypes.string,
}

export default IconTwitter
/* eslint-enable */
