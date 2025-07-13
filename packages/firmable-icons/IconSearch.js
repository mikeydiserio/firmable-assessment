
import classnames from 'classnames'
import PropTypes from 'prop-types'
import IconBase from './IconBase'

const IconSearch = ({ className, ...rest }) => {
  const classes = classnames(
    'icon',
    'icon--search',
    className,
  )

  return (
    <IconBase className={classes} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"{...rest}><title>Search</title><path className="path1" d="M8.02 1.637a6.39 6.39 0 0 1 6.384 6.383 6.39 6.39 0 0 1-6.384 6.384A6.39 6.39 0 0 1 1.637 8.02 6.39 6.39 0 0 1 8.02 1.637m9.64 14.33l-3.155-3.157c-.01-.01-.024-.018-.035-.028a7.978 7.978 0 0 0 1.57-4.762C16.04 3.598 12.444 0 8.02 0 3.598 0 0 3.598 0 8.02c0 4.423 3.598 8.02 8.02 8.02a7.98 7.98 0 0 0 5.058-1.8l3.154 3.153a1 1 0 0 0 .714.295 1.01 1.01 0 0 0 .714-1.722" fill="#FFF" fillRule="evenodd"/></IconBase>
  )
}

IconSearch.propTypes = {
  className: PropTypes.string,
}

export default IconSearch
/* eslint-enable */
