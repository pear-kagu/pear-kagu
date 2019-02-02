import React, {Component} from 'react'
import {connect} from 'react-redux'
import Carousel from './Carousel'

class InterestPage extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div>
        <h1>{this.props.interest.name}</h1>
        <h3>Select a video to add to your interest board:</h3>
        <Carousel typeId="2" title="Watch" />
        <h3>Select a meetup to add to your interest board:</h3>
        <Carousel typeId="3" title="Do" />
        <h3>Select an article to add to your interest board:</h3>
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
