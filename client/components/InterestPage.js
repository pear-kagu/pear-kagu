import React, {Component} from 'react'
import {connect} from 'react-redux'
import {ReadCarousel, WatchCarousel, DoCarousel, Carousel} from '../components'
import Typography from '@material-ui/core/Typography'

class InterestPage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Typography variant="h2" marked="center" align="center" component="h2">
          {this.props.interest.name}
        </Typography>
        <Typography variant="h6" marked="center" align="center" component="h2">
          Select a video to add to your interest board:
        </Typography>
        <div className="item-list clearfix">
          <Carousel typeId="2" title="Watch" />
        </div>
        <Typography variant="h6" marked="center" align="center" component="h2">
          Select a meetup to add to your interest board:
        </Typography>
        <div className="item-list clearfix">
          <Carousel typeId="3" title="Do" />
        </div>
        <Typography variant="h6" marked="center" align="center" component="h2">
          Select an article to add to your interest board:
        </Typography>
        <div className="item-list clearfix">
          <Carousel typeId="1" title="Read" />
        </div>
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
