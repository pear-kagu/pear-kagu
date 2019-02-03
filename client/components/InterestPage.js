import React, {Component} from 'react'
import {connect} from 'react-redux'
import {ReadCarousel, WatchCarousel, DoCarousel} from '../components'
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
          <WatchCarousel />
        </div>
        <Typography variant="h6" marked="center" align="center" component="h2">
          Select a meetup to add to your interest board:
        </Typography>
        <div className="item-list clearfix">
          <DoCarousel />
        </div>
        <Typography variant="h6" marked="center" align="center" component="h2">
          Select an article to add to your interest board:
        </Typography>
        <div className="item-list clearfix">
          <ReadCarousel />
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
