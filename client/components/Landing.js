import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
// import {Link} from 'react-router-dom'

class Landing extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div>
        <h2>Welcome! Select an interest to get started</h2>
        <div>Javascript</div>
        <div>Learn how to code</div>
        <div>Women in code</div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */

export default Landing

/**
 * PROP TYPES
 */
Landing.propTypes = {
  //   handleClick: PropTypes.func.isRequired,
  //   isLoggedIn: PropTypes.bool.isRequired
}
