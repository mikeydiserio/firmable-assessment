
import classnames from 'classnames'
import PropTypes from 'prop-types'
import IconBase from './IconBase'

const IconFileUpload = ({ className, ...rest }) => {
  const classes = classnames(
    'icon',
    'icon--fileupload',
    className,
  )

  return (
    <IconBase className={classes} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58 58"{...rest}><g fill="none" fillRule="evenodd"><path className="path1" stroke="#E0E0E0" strokeWidth="2" d="M28.61 56.15c15.187 0 27.5-12.234 27.5-27.325S43.796 1.5 28.61 1.5c-15.188 0-27.5 12.234-27.5 27.325 0 15.09 12.312 27.324 27.5 27.324z"/><path className="path2" fill="#E5E5E5" d="M18.056 37.055v-5.453a1.048 1.048 0 0 0-.319-.768 1.106 1.106 0 0 0-.784-.313c-.29.003-.567.118-.77.32a1.05 1.05 0 0 0-.31.767v6.512c0 .59.49 1.064 1.09 1.064h23.572c.602 0 1.092-.475 1.092-1.064v-6.518a1.058 1.058 0 0 0-.544-.932 1.116 1.116 0 0 0-1.095 0 1.06 1.06 0 0 0-.544.936v5.449H18.056zm9.602-4.366c-.008.568.51 1.081 1.092 1.081.582 0 1.1-.513 1.091-1.085V20.74l4.278 4.517c.25.29.652.427 1.043.35.393-.077.711-.357.83-.731a1.046 1.046 0 0 0-.271-1.064l-6.167-6.51a1.106 1.106 0 0 0-.884-.341c-.276.019-.536.14-.725.34l-6.173 6.518c-.278.271-.382.68-.264 1.057.118.374.437.654.83.731.39.077.793-.06 1.05-.359l4.27-4.508v11.949z"/></g></IconBase>
  )
}

IconFileUpload.propTypes = {
  className: PropTypes.string,
}

export default IconFileUpload
/* eslint-enable */
