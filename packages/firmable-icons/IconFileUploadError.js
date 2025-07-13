
import classnames from 'classnames'
import PropTypes from 'prop-types'
import IconBase from './IconBase'

const IconFileUploadError = ({ className, ...rest }) => {
  const classes = classnames(
    'icon',
    'icon--fileuploaderror',
    className,
  )

  return (
    <IconBase className={classes} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 57 57"{...rest}><g fill="none" fillRule="evenodd"><path className="path1" fill="#F5A623" d="M28.5 57C44.24 57 57 44.24 57 28.5S44.24 0 28.5 0 0 12.76 0 28.5 12.76 57 28.5 57z"/><rect width="2.8" height="18" x="27" y="14" fill="#FFF" rx="1.4"/><ellipse cx="29" cy="39.983" fill="#FFF" rx="2" ry="1.983"/></g></IconBase>
  )
}

IconFileUploadError.propTypes = {
  className: PropTypes.string,
}

export default IconFileUploadError
/* eslint-enable */
