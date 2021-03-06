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
import {setSavedContentinDB, deleteSavedContentinDB} from '../store'
import axios from 'axios'
import {withAlert} from 'react-alert'

var cardStyle = {
  display: 'block',
  width: '30vw',
  transitionDuration: '0.3s',
  height: '20vw',
  marginBottom: '1vw'
}

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

class CarouselCard extends Component {
  constructor() {
    super()
    this.state = {
      heart: ''
    }
    this.handleFavoriteClick = this.handleFavoriteClick.bind(this)
  }

  handleFavoriteClick = contentId => event => {
    if (this.props.user.id) {
      if (this.state.heart === 'red') {
        this.setState({
          heart: ''
        })
        this.props.deleteSavedContentinDB(this.props.user.id, contentId)
      } else {
        this.setState({
          heart: 'red'
        })
        this.props.setSavedContentinDB(this.props.user.id, contentId)
      }
    } else {
      this.props.alert.show(
        'Please sign in or sign up to save to your favorites'
      )
    }
  }

  render() {
    const {content, classes, description} = this.props

    return (
      <Card className={classes.card} style={cardStyle}>
        <IconButton
          aria-label="Add to favorites"
          onClick={this.handleFavoriteClick(content.id)}
        >
          <FavoriteIcon style={{color: this.state.heart}} />
        </IconButton>
        <a href={content.sourceUrl} target="blank">
          <CardMedia
            className={classes.media}
            image={content.imageUrl}
            title={content.title}
          />
          <CardContent>
            <Typography variant="button" paragraph>
              {content.title}
            </Typography>
            <Typography variant="caption" paragraph align="justify">
              {description}
            </Typography>
          </CardContent>
        </a>
      </Card>
    )
  }
}

/**
 * CONTAINER
 */

const mapState = state => {
  return {
    user: state.user.user
  }
}
const mapDispatch = dispatch => {
  return {
    setSavedContentinDB: (userId, contentId) =>
      dispatch(setSavedContentinDB(userId, contentId)),
    deleteSavedContentinDB: (userId, contentId) =>
      dispatch(deleteSavedContentinDB(userId, contentId))
  }
}

CarouselCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withAlert(
  connect(mapState, mapDispatch)(withStyles(styles)(CarouselCard))
)
