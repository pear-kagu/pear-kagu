import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Carousel} from '../components'
import Typography from '@material-ui/core/Typography'
import {fetchSelectedInterest} from '../store'

class InterestPage extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const interestName = this.props.match.params.interestName
    this.props.fetchSelectedInterest(interestName)
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
    allInterests: state.interest.allInterests
  }
}
const mapDispatch = dispatch => {
  return {
    fetchSelectedInterest: interestName =>
      dispatch(fetchSelectedInterest(interestName))
  }
}

export default connect(mapState, mapDispatch)(InterestPage)
