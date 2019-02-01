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
        <h2>{this.props.interest.name}</h2>
        <Carousel typeId="2" title="Watch" />
        <Carousel typeId="3" title="Do" />
        <Carousel typeId="1" title="Read" />
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    interest: state.interest.selectedInterest.interest
  }
}

export default connect(mapState)(InterestPage)
