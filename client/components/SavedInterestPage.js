import React, {Component} from 'react'
import {connect} from 'react-redux'
import {SavedContentCarousel} from '../components'
import Typography from '@material-ui/core/Typography'
import {fetchSavedContent} from '../store'

class InterestPage extends Component {
  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    console.log('componentdid mount in Interest Page')
    await this.props.fetchSavedContent(
      this.props.user.id,
      this.props.interest.id,
      this.props.typeId
    )
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
    interest: state.interest.selectedInterest.interest,
    user: state.user.user
  }
}

const mapDispatch = dispatch => {
  return {
    fetchSavedContent: (userId, interestId) =>
      dispatch(fetchSavedContent(userId, interestId))
  }
}

export default connect(mapState, mapDispatch)(InterestPage)
