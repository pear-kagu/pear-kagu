import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withStyles} from '@material-ui/core/styles'
// import CardMedia from '@material-ui/core/CardMedia'
// import CardContent from '@material-ui/core/CardContent'
// import Typography from '@material-ui/core/Typography'
// import FavoriteIcon from '@material-ui/icons/Favorite'
// import IconButton from '@material-ui/core/IconButton'
import {fetchContent, setSavedContentinDB} from '../store'
import InfiniteCarousel from 'react-leaf-carousel'
import {CarouselCard} from '../components'

class Carousel extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.fetchContent(this.props.typeId, this.props.selectedInterest.id)
  }

  render() {
    const {read, watch, meet} = this.props

    return (
      <InfiniteCarousel
        breakpoints={[
          {
            breakpoint: 500,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3
            }
          }
        ]}
        dots={false}
        showSides={true}
        sidesOpacity={0.5}
        sideSize={0.1}
        slidesToScroll={4}
        slidesToShow={4}
        scrollOnDevice={true}
        lazyLoad={true}
      >
        {this.props.typeId === '1' ? (
          read.map(singleArticle => {
            return (
              <CarouselCard key={singleArticle.id} content={singleArticle} />
            )
          })
        ) : this.props.typeId === '2' ? (
          watch.map(video => {
            if (video.description) {
              video.description = video.description.slice(0, 100) + '...'
            }
            return <CarouselCard key={video.id} content={video} />
          })
        ) : this.props.typeId === '3' ? (
          meet.map(meetup => {
            let removedHtmlDescription
            if (meetup.description) {
              removedHtmlDescription =
                meetup.description
                  .replace(/<\/?[^>]+(>|$)/g, '')
                  .slice(0, 100) + '...'
            }
            return (
              <CarouselCard
                key={meetup.id}
                content={meetup}
                removedHtmlDescription={removedHtmlDescription}
              />
            )
          })
        ) : (
          <div />
        )}
      </InfiniteCarousel>
    )
  }
}

/**
 * CONTAINER
 */

const mapState = state => {
  return {
    read: state.content.read,
    watch: state.content.watch,
    meet: state.content.do,
    selectedInterest: state.interest.selectedInterest.interest,
    user: state.user.user
  }
}

const mapDispatch = dispatch => {
  return {
    fetchContent: (typeId, interestId) =>
      dispatch(fetchContent(typeId, interestId)),
    setSavedContentinDB: (userId, contentId) =>
      dispatch(setSavedContentinDB(userId, contentId))
  }
}

Carousel.propTypes = {}

export default connect(mapState, mapDispatch)(Carousel)
