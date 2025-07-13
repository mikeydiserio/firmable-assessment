
import classnames from 'classnames'
import PropTypes from 'prop-types'
import IconBase from './IconBase'

const IconMail = ({ className, ...rest }) => {
  const classes = classnames(
    'icon',
    'icon--mail',
    className,
  )

  return (
    <IconBase className={classes} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 87.1 78.7"{...rest}><title>Icons</title><defs><path className="path1" d="M1 39.2c-1.1-1.9-.5-4.4 1.5-5.5L59.3.9c1.9-1.1 4.4-.5 5.5 1.5l21.5 37.2c1.1 1.9.5 4.4-1.5 5.5L27.9 77.9c-1.9 1.1-4.4.5-5.5-1.5L1 39.2z"/></defs><clipPath><use xlinkHref="#a" overflow="visible"/></clipPath><g clipPath="url(#b)"><defs><path className="path2" d="M-689.2-226.3h1440v1241h-1440z"/></defs><clipPath><use xlinkHref="#c" overflow="visible"/></clipPath><path className="path3" clipPath="url(#d)" fill="none" stroke="#72C7E7" strokeWidth="10" strokeMiterlimit="10" d="M1 39.2c-1.1-1.9-.5-4.4 1.5-5.5L59.3.9c1.9-1.1 4.4-.5 5.5 1.5l21.5 37.2c1.1 1.9.5 4.4-1.5 5.5L27.9 77.9c-1.9 1.1-4.4.5-5.5-1.5L1 39.2z"/></g><g clipPath="url(#b)"><defs><path className="path4" d="M65 2.9s-.3.8-.7 1.9L48.6 44.2c-.4 1-1.6 1.7-2.7 1.5L3.1 38.5"/></defs><clipPath><use xlinkHref="#e" overflow="visible"/></clipPath><g clipPath="url(#f)"><defs><path className="path5" d="M-689.2-226.3h1440v1241h-1440z"/></defs><clipPath><use xlinkHref="#g" overflow="visible"/></clipPath><path className="path6" clipPath="url(#h)" fill="none" stroke="#72C7E7" strokeWidth="6" strokeMiterlimit="10" d="M65 2.9s-.3.8-.7 1.9L48.6 44.2c-.4 1-1.6 1.7-2.7 1.5L3.1 38.5"/></g></g></IconBase>
  )
}

IconMail.propTypes = {
  className: PropTypes.string,
}

export default IconMail
/* eslint-enable */
