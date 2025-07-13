
import classnames from 'classnames'
import PropTypes from 'prop-types'
import IconBase from './IconBase'

const IconPencil = ({ className, ...rest }) => {
  const classes = classnames(
    'icon',
    'icon--pencil',
    className,
  )

  return (
    <IconBase className={classes} viewBox="0 0 19 19" xmlns="http://www.w3.org/2000/svg"{...rest}><title>Shape</title><path className="path1" d="M1.2 13.3L0 18.4c0 .1 0 .3.1.4.1.1.2.1.3.1h.1l5.2-1.2h.1l-4.6-4.4c0-.1 0-.1 0 0zM12.4 2.1l4.5 4.5.6-.6L13 1.5l-.6.6zM1.8 12.6l4.5 4.5 10-10-4.5-4.5-10 10zM18.4 2.4L16.7.7c-.4-.4-.9-.6-1.4-.6-.5 0-1 .2-1.4.6l-.3.3 4.5 4.5.3-.3c.8-.8.8-2.1 0-2.8z" fill="#B5B5B5" fillRule="evenodd"/></IconBase>
  )
}

IconPencil.propTypes = {
  className: PropTypes.string,
}

export default IconPencil
/* eslint-enable */
