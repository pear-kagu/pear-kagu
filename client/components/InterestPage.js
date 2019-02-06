import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Carousel} from '../components'
import Typography from '@material-ui/core/Typography'
import {fetchContent, clearContent} from '../store'

class InterestPage extends Component {
  async componentDidMount() {
    const interestName = this.props.match.params.interestName
    await this.props.fetchContent(interestName)
  }
  componentWillUnmount() {
    this.props.clearContent()
  }
  render() {
    const interestName = this.props.match.params.interestName
    const {content} = this.props
    return (
      <div>
        <Typography variant="h2" marked="center" align="center" component="h2">
          {interestName}
        </Typography>
        <Typography variant="h6" marked="center" align="center" component="h2">
          Select a video to add to your interest board:
        </Typography>
        <div className="carousel-border">
          {/* {
            typeof content.read === 'string' ? <div></div>
            content.read.length ? <Carousel typeId="2" /> : <div> Loading </div>
            } */}
        </div>
        <Typography variant="h6" marked="center" align="center" component="h2">
          Select a meetup to add to your interest board:
        </Typography>
        <div className="carousel-border">
          {content.read.length ? <Carousel typeId="3" /> : <div> Loading </div>}
        </div>
        <Typography variant="h6" marked="center" align="center" component="h2">
          Select an article to add to your interest board:
        </Typography>
        <div className="carousel-border">
          {content.read.length ? <Carousel typeId="1" /> : <div> Loading </div>}
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
    content: state.content
  }
}
const mapDispatch = dispatch => {
  return {
    fetchContent: interestName => dispatch(fetchContent(interestName)),
    clearContent: () => dispatch(clearContent())
  }
}

export default connect(mapState, mapDispatch)(InterestPage)
