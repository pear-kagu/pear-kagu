import React, {Component} from 'react'
import {connect} from 'react-redux'
import {ReadCarousel, WatchCarousel, DoCarousel} from '../components'

class InterestPage extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div>
        <h1>{this.props.interest.name}</h1>
        <h3>Select a video to add to your interest board:</h3>
        <WatchCarousel typeId="2" title="Watch" />
        <h3>Select an article to add to your interest board:</h3>
        <ReadCarousel typeId="1" title="Read" />
        <h3>Select a meetup to add to your interest board:</h3>
        <DoCarousel typeId="3" title="Do" />
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
