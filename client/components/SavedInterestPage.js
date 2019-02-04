import React, {Component} from 'react'
import {connect} from 'react-redux'
import {SavedContentCarousel} from '../components'
import Typography from '@material-ui/core/Typography'
import {fetchSavedContent} from '../store'

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
          Saved Videos:
        </Typography>
        <div className="item-list clearfix">
          <SavedContentCarousel carouselId="2" title="Watch" />
        </div>
        <Typography variant="h6" marked="center" align="center" component="h2">
          Saved Meetups:
        </Typography>
        <div className="item-list clearfix">
          <SavedContentCarousel carouselId="3" title="Do" />
        </div>
        <Typography variant="h6" marked="center" align="center" component="h2">
          Saved Articles:
        </Typography>
        <div className="item-list clearfix">
          <SavedContentCarousel carouselId="1" title="Read" />
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
    interest: state.interests,
    user: state.user.user
  }
}

export default connect(mapState)(InterestPage)
