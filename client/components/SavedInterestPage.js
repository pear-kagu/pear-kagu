import React, {Component} from 'react'
import {connect} from 'react-redux'
import {SavedContentCarousel} from '../components'
import Typography from '@material-ui/core/Typography'
import {fetchSavedContent, clearContent} from '../store'

class InterestPage extends Component {
  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    const interestName = this.props.match.params.interestName
    await this.props.fetchSavedContent(this.props.user.id, interestName)
  }
  componentWillUnmount() {
    this.props.clearContent()
  }
  render() {
    const {content} = this.props
    return (
      <div>
        <Typography variant="h2" marked="center" align="center" component="h2">
          {this.props.interest.name}
        </Typography>
        <Typography variant="h6" marked="center" align="center" component="h2">
          Saved Videos:
        </Typography>
        <div className="item-list clearfix">
          {content.watch.length ? (
            <SavedContentCarousel carouselId="2" title="Watch" />
          ) : (
            <div>No saved videos</div>
          )}
        </div>
        <Typography variant="h6" marked="center" align="center" component="h2">
          Saved Meetups:
        </Typography>
        <div className="item-list clearfix">
          {content.meet.length ? (
            <SavedContentCarousel carouselId="3" title="Do" />
          ) : (
            <div>No saved meetups</div>
          )}
        </div>
        <Typography variant="h6" marked="center" align="center" component="h2">
          Saved Articles:
        </Typography>
        <div className="item-list clearfix">
          {content.read.length ? (
            <SavedContentCarousel carouselId="1" title="Read" />
          ) : (
            <div>No saved articles</div>
          )}
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapDispatch = dispatch => {
  return {
    fetchSavedContent: (userId, interestName) =>
      dispatch(fetchSavedContent(userId, interestName)),
    clearContent: () => dispatch(clearContent())
  }
}

const mapState = state => {
  return {
    interest: state.interests,
    user: state.user.user,
    content: state.content
  }
}

export default connect(mapState, mapDispatch)(InterestPage)
