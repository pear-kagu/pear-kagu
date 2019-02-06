import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Carousel, Spinner} from '../components'
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
        <Typography variant="h6" marked="center" align="left" component="h2">
          Watch:
        </Typography>
        <div className="carousel-border">
          {typeof content.watch === 'string' ? (
            <div>{content.watch}</div>
          ) : content.watch.length ? (
            <Carousel typeId="2" />
          ) : (
            <Spinner />
          )}
        </div>
        <Typography variant="h6" marked="center" align="left" component="h2">
          Meet-up:
        </Typography>
        <div className="carousel-border">
          {typeof content.meet === 'string' ? (
            <div>{content.meet}</div>
          ) : content.meet.length ? (
            <Carousel typeId="3" />
          ) : (
            <Spinner />
          )}
        </div>
        <Typography variant="h6" marked="center" align="left" component="h2">
          Read:
        </Typography>
        <div className="carousel-border">
          {typeof content.read === 'string' ? (
            <div>{content.read}</div>
          ) : content.read.length ? (
            <Carousel typeId="1" />
          ) : (
            <Spinner />
          )}
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
