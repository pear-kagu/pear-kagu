import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import FavoriteIcon from '@material-ui/icons/Favorite'
import IconButton from '@material-ui/core/IconButton'
import {fetchContent, setSavedContentinDB} from '../store'
import InfiniteCarousel from 'react-leaf-carousel'

const styles = () => ({
  card: {
    maxWidth: 400
  },
  media: {
    height: 0,
    paddingTop: '50%' // 16:9
  },
  actions: {
    display: 'block'
  }
})

class Carousel extends Component {
  constructor() {
    super()
    this.handleFavoriteClick = this.handleFavoriteClick.bind(this)
  }

  componentDidMount() {
    this.props.fetchContent(this.props.typeId, this.props.selectedInterest.id)
  }

  handleFavoriteClick = contentId => event => {
    if (this.props.user.id) {
      this.props.setSavedContentinDB(this.props.user.id, contentId)
    } else {
      alert('Please sign in or sign up to save to your favorites')
    }
  }

  render() {
    const {classes, read, watch, meet} = this.props

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
              <div key={singleArticle.id}>
                <Card className={classes.card}>
                  <IconButton
                    aria-label="Add to favorites"
                    onClick={this.handleFavoriteClick(singleArticle.id)}
                  >
                    <FavoriteIcon />
                  </IconButton>
                  <a href={singleArticle.sourceUrl} target="blank">
                    <CardMedia
                      className={classes.media}
                      image={singleArticle.imageUrl}
                      title={singleArticle.title}
                    />
                    <CardContent>
                      <Typography variant="button" paragraph>
                        {singleArticle.title}
                      </Typography>
                    </CardContent>
                  </a>
                </Card>
              </div>
            )
          })
        ) : this.props.typeId === '2' ? (
          watch.map(video => {
            if (video.description) {
              video.description = video.description.slice(0, 100) + '...'
            }
            return (
              <div key={video.id}>
                <Card>
                  <IconButton
                    aria-label="Add to favorites"
                    onClick={this.handleFavoriteClick(video.id)}
                  >
                    <FavoriteIcon />
                  </IconButton>
                  <a href={video.sourceUrl} target="blank">
                    <CardMedia
                      className={classes.media}
                      image={video.imageUrl}
                      title={video.title}
                    />
                    <CardContent>
                      <Typography paragraph variant="button">
                        {video.title}
                      </Typography>
                      <Typography variant="caption" paragraph align="justify">
                        {video.description}
                      </Typography>
                    </CardContent>
                  </a>
                </Card>
              </div>
            )
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
              <div key={meetup.id}>
                <Card>
                  <IconButton
                    aria-label="Add to favorites"
                    onClick={this.handleFavoriteClick(meetup.id)}
                  >
                    <FavoriteIcon />
                  </IconButton>
                  <a href={meetup.sourceUrl} target="blank">
                    <CardMedia
                      className={classes.media}
                      image={meetup.imageUrl}
                      title={meetup.title}
                    />
                    <CardContent>
                      <Typography variant="button" paragraph>
                        {meetup.title}
                      </Typography>
                      <Typography variant="caption" paragraph align="justify">
                        {removedHtmlDescription}
                      </Typography>
                    </CardContent>
                  </a>
                </Card>
              </div>
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

Carousel.propTypes = {
  classes: PropTypes.object.isRequired
}

export default connect(mapState, mapDispatch)(withStyles(styles)(Carousel))
