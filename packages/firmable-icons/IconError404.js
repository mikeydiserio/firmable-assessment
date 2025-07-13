
import classnames from 'classnames'
import PropTypes from 'prop-types'
import IconBase from './IconBase'

const IconError404 = ({ className, ...rest }) => {
  const classes = classnames(
    'icon',
    'icon--error404',
    className,
  )

  return (
    <IconBase className={classes} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 173.1 136.7"{...rest}><path className="path1" fill="#00A1DE" d="M164.3 136.7H8.7c-4.8 0-8.7-3.9-8.7-8.7 0-4.8 3.9-8.7 8.7-8.7h155.6c4.8 0 8.7 3.9 8.7 8.7.1 4.8-3.9 8.7-8.7 8.7z"/><path className="path2" fill="#004BB7" d="M114.3 136.7H8.7c-4.8 0-8.7-3.9-8.7-8.7 0-4.8 3.9-8.7 8.7-8.7h105.5c4.8 0 8.7 3.9 8.7 8.7.1 4.8-3.8 8.7-8.6 8.7z"/><path className="path3" fill="#0068C6" d="M69.5 54.3h34.1v75.6H69.5z"/><path className="path4" fill="#0068C6" d="M116.4 130.9H56.6c-1.6 0-2.9-1.3-2.9-2.9 0-1.6 1.3-2.9 2.9-2.9h59.8c1.6 0 2.9 1.3 2.9 2.9.1 1.6-1.3 2.9-2.9 2.9z"/><path className="path5" fill="#00A1DE" d="M168.3 108.7H4.8c-2.6 0-4.8-2.1-4.8-4.8V4.8C0 2.1 2.1 0 4.8 0h163.5c2.6 0 4.8 2.1 4.8 4.8v99.1c0 2.6-2.2 4.8-4.8 4.8z"/><path className="path6" fill="#0068C6" d="M0 4.8v99.1c0 2.6 2.1 4.8 4.8 4.8h163.5c2.6 0 4.8-2.1 4.8-4.8"/><path className="path7" fill="#004BB7" d="M69.5 125v-16.3h34.1z"/><path className="path8" fill="#6ACEE5" d="M160.9 99.9H10.6c-1.1 0-2.1-.9-2.1-2.1V11.4c0-1.1.9-2.1 2.1-2.1h150.3c1.1 0 2.1.9 2.1 2.1v86.4c0 1.2-.9 2.1-2.1 2.1z"/><path className="path9" fill="#004BB7" d="M100.3 65.2L86.8 41.8c-.2-.4-.6-.7-1.1-.7-.4 0-.8.2-1.1.7L71.2 65.2c-.2.4-.3 1.4-.1 1.8.2.4.6 1.1 1.1 1.1h27c.5 0 .9-.7 1.1-1.1.3-.5.3-1.4 0-1.8zM85 50.2c0-.5 0-.9.5-.9s.5.4.5.9v7.3c0 .5 0 .9-.5.9s-.5-.4-.5-.9v-7.3zm.8 12.8c-.9 0-1.6-.7-1.6-1.6 0-.9.7-1.6 1.6-1.6.9 0 1.6.7 1.6 1.6 0 .9-.8 1.6-1.6 1.6z"/></IconBase>
  )
}

IconError404.propTypes = {
  className: PropTypes.string,
}

export default IconError404
/* eslint-enable */
