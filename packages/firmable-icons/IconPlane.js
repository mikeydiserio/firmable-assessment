
import classnames from 'classnames'
import PropTypes from 'prop-types'
import IconBase from './IconBase'

const IconPlane = ({ className, ...rest }) => {
  const classes = classnames(
    'icon',
    'icon--plane',
    className,
  )

  return (
    <IconBase className={classes} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130 85"{...rest}><g fill="none" fillRule="evenodd"><path className="path1" fill="#87BD40" fillRule="nonzero" d="M73.104 32.554L62.34 44.52l-1.704-19.777s55.04-19.68 62.054-20.562c7.014-.883-49.586 28.373-49.586 28.373"/><path className="path2" stroke="#282D2C" strokeLinecap="round" stroke-linejoin="round" strokeWidth="2.374" d="M73.104 32.554L62.34 44.52l-1.704-19.777s55.04-19.68 62.054-20.562c7.014-.883-49.586 28.373-49.586 28.373z"/><path className="path3" fill="#F6F7F7" fillRule="nonzero" d="M73.103 32.553l26.75 9.38 28.382-40.75-88.187 15.523 20.589 8.038L122.69 4.18z"/><path className="path4" stroke="#282D2C" strokeLinecap="round" stroke-linejoin="round" strokeWidth="2.374" d="M73.103 32.553l26.75 9.38 28.382-40.75-88.187 15.523 20.589 8.038 67.598-23.561z"/><path className="path5" stroke="#87BD40" strokeLinecap="round" stroke-linejoin="round" strokeWidth="2.374" d="M1.257 83.795s34.144-20.699 20.226-25.442C10.827 54.472 3.28 87.854 40.621 63.635c11.294-7.326 17.834-14.338 17.834-14.338"/></g></IconBase>
  )
}

IconPlane.propTypes = {
  className: PropTypes.string,
}

export default IconPlane
/* eslint-enable */
