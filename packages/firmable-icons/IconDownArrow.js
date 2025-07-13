
import classnames from 'classnames'
import PropTypes from 'prop-types'
import IconBase from './IconBase'

const IconDownArrow = ({ className, ...rest }) => {
  const classes = classnames(
    'icon',
    'icon--downarrow',
    className,
  )

  return (
    <IconBase className={classes} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23.3 35.5"{...rest}><path className="path1" fill="#00A1DE" d="M22.6 22.1c-1-1-2.6-1-3.5 0L14.2 27V2.5C14.2 1.1 13 0 11.7 0S9.2 1.1 9.2 2.5V27l-4.9-4.9c-1-1-2.6-1-3.5 0-1 1-1 2.6 0 3.5l9.1 9.1c.1.1.3.2.4.3.1.1.3.2.4.2h.1c.1 0 .2.1.4.1h.5c.2 0 .3 0 .5-.1.1 0 .1 0 .2-.1.1 0 .2 0 .2-.1.1 0 .1-.1.2-.1s.2-.1.2-.1l.1-.1c.1-.1.2-.1.2-.2l9.2-9.2c1.1-.6 1.1-2.2.1-3.2z"/></IconBase>
  )
}

IconDownArrow.propTypes = {
  className: PropTypes.string,
}

export default IconDownArrow
/* eslint-enable */
