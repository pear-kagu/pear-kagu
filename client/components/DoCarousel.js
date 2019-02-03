import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import FavoriteIcon from '@material-ui/icons/Favorite'
import IconButton from '@material-ui/core/IconButton'
import {fetchContent, setSavedContentinDB, clearContent} from '../store'
import InfiniteCarousel from 'react-leaf-carousel'

const styles = theme => ({
  card: {
    maxWidth: 400
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  actions: {
    display: 'flex'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  }
})

class DoCarousel extends Component {
  constructor(props) {
    super(props)
    this.handleFavoriteClick = this.handleFavoriteClick.bind(this)
  }

  componentDidMount() {
    this.props.fetchContent('3', this.props.selectedInterest.id)
  }

  componentWillUnmount() {
    this.props.clearContent()
  }

  handleFavoriteClick = contentId => event => {
    if (this.props.user.id) {
      this.props.setSavedContentinDB(this.props.user.id, contentId)
    } else {
      alert('Please sign in or sign up to save to your favorites')
    }
  }

  render() {
    const {classes, meet} = this.props
    return (
      <div>
        {meet.length ? (
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
            {meet.map(meetup => {
              let removedHtmlDescription = meetup.description.replace(
                /<\/?[^>]+(>|$)/g,
                ''
              )
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
                      <CardHeader title={meetup.title} subheader="" />
                      <CardMedia
                        className={classes.media}
                        image={meetup.imageUrl}
                        title={meetup.title}
                      />
                      <CardContent>
                        <Typography
                          className={classes.pos}
                          color="textSecondary"
                        >
                          {removedHtmlDescription}
                        </Typography>
                      </CardContent>
                    </a>
                  </Card>
                </div>
              )
            })}
          </InfiniteCarousel>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    )
  }
}

/**
 * CONTAINER
 */

const mapState = state => {
  return {
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
      dispatch(setSavedContentinDB(userId, contentId)),
    clearContent: () => {
      dispatch(clearContent())
    }
  }
}

DoCarousel.propTypes = {
  classes: PropTypes.object.isRequired
}

export default connect(mapState, mapDispatch)(withStyles(styles)(DoCarousel))
