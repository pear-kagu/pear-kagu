import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Carousel from './Carousel'

class InterestPage extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div>
        <h2>Javascript</h2>
        <Carousel type="Read" />
        <Carousel type="Watch" />
        <Carousel type="Do" />
      </div>
    )
  }
}

/**
 * CONTAINER
 */

export default InterestPage
