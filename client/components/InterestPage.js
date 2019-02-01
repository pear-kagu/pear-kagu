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
        <h2>{this.props.state.interest.name}</h2>
        <Carousel typeId="1" title="Read" />
        <Carousel typeId="2" title="Watch" />
        <Carousel typeId="3" title="Do" />
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    interest: this.state.selectedInterest
  }
}

export default connect(mapState)(InterestPage)
