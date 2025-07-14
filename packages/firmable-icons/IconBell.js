
import classnames from 'classnames'
import PropTypes from 'prop-types'
import IconBase from './IconBase'

const IconBell = ({ className, ...rest }) => {
  const classes = classnames(
    'icon',
    'icon--bell',
    className,
  )

  return (
    <IconBase className={classes} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18"{...rest}><path className="path1" fill="#FFF" d="M16.4 15.5c-1.9-1.9-2.7-4.2-2.7-7.8 0-2.1-1.4-3.8-3.2-4.4.3-.3.5-.8.5-1.3C11 .9 10.1.1 9.1.1s-2 .9-2 1.9c0 .5.2.9.5 1.3-1.9.6-3.3 2.3-3.3 4.4 0 3.5-.8 5.9-2.7 7.8-.1.1-.2.2-.1.4s.3.1.5.1h4.7c.2 1 1.2 1.9 2.3 1.9 1.1 0 2.1-.9 2.3-1.9H16c.2 0 .4.1.5-.1.1-.2 0-.3-.1-.4zM9 1.1c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9zm0 3c2 0 3.7 1.5 3.7 3.6 0 2.2.3 4.4.9 5.4H4.4c.6-1 .9-3.2.9-5.4C5.4 5.6 7 4.1 9 4.1zm0 12.8c-.6 0-1.1-.9-1.3-.9h2.5c-.1 0-.6.9-1.2.9zM3.1 15c.4 0 .7-1 1-1h9.8c.3 0 .6 1 1 1H3.1z"/></IconBase>
  )
}

IconBell.propTypes = {
  className: PropTypes.string,
}

export default IconBell
/* eslint-enable */
