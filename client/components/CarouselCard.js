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
import {setSavedContentinDB} from '../store'

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

  handleFavoriteClick(event) {
    if (this.props.user.id) {
      // this.props.setSavedContentinDB(this.props.user.id, event.target.value)
      this.setState({
        heart: 'red'
      })
    } else {
      alert('Please sign in or sign up to save to your favorites')
    }
  }

  render() {
    const {singleArticle, classes} = this.props
    console.log('singleArticle', singleArticle)
    console.log('carousel state', this.state)

    return (
      <Card className={classes.card}>
        <IconButton
          aria-label="Add to favorites"
          onClick={this.handleFavoriteClick}
        >
          <FavoriteIcon style={{color: this.state.heart}} />
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
      dispatch(setSavedContentinDB(userId, contentId))
  }
}

Card.propTypes = {
  classes: PropTypes.object.isRequired
}

export default connect(mapState, mapDispatch)(withStyles(styles)(CarouselCard))
