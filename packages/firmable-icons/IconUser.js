
import classnames from 'classnames'
import PropTypes from 'prop-types'
import IconBase from './IconBase'

const IconUser = ({ className, ...rest }) => {
  const classes = classnames(
    'icon',
    'icon--user',
    className,
  )

  return (
    <IconBase className={classes} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"{...rest}><circle fill="#00A1DE" cx="25" cy="25" r="25"/><g fill="#007FC0"><path className="path1" d="M18.6 32.4c.4 0 .7.1.9.4l5.6 6.2 5.6-6.2c.3-.3.6-.4.9-.4 6.6.5 10.9 3.6 12.9 7.9C48 36.1 50 30.8 50 25 50 11.2 38.8 0 25 0S0 11.2 0 25c0 6.1 2.2 11.7 5.8 16 2-4.3 6.4-8.1 12.8-8.6zm-1.1-21.3c1.8-2.2 4.4-3.3 7.6-3.4 3.1 0 5.7 1.1 7.6 3.2 1.9 2.3 2.8 5.4 2.4 8.9-.8 7.1-4.8 11.9-9.9 11.9s-9.1-4.8-9.9-11.9c-.4-3.3.4-6.5 2.2-8.7z"/><path className="path2" d="M25.2 29.2c3.2 0 6.8-3 7.5-9.6.3-2.8-.3-4.9-1.8-6.6-1.3-1.5-3.3-2-5.6-2h-.1c-2.5 0-4.5.5-5.9 2.1-1.4 1.7-2 3.7-1.7 6.4.8 6.7 4.4 9.7 7.6 9.7zM32.1 35.2L26 41.9c-.2.3-.5.4-.9.4-.3 0-.6-.1-.9-.4l-6.1-6.7c-5.3.5-8.9 3.7-10.6 7.8 4.5 4.3 10.6 7 17.3 7 7 0 13.3-2.9 17.9-7.5-1.4-4.2-5.1-6.8-10.6-7.3z"/></g></IconBase>
  )
}

IconUser.propTypes = {
  className: PropTypes.string,
}

export default IconUser
/* eslint-enable */
