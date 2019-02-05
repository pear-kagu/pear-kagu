import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import {setSavedContentinDB} from '../store'
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined'
import {withAlert} from 'react-alert'

const styles = theme => ({
  card: {
    maxWidth: 400
  },
  media: {
    height: 0,
    paddingTop: '50%' // 16:9
  },
  actions: {
    display: 'block'
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: 32
  }
})

class SavedCarouselCard extends Component {
  constructor() {
    super()

    this.handleDelete = this.handleDelete.bind(this)
  }

  handleDelete(contentId) {
    if (this.props.user.id) {
      this.props.removeSavedContent(this.props.user.id, contentId)
      console.log('handle click works')
    } else {
      this.props.alert.show(
        'Please sign in or sign up to save to your favorites'
      )
    }
  }

  render() {
    const {content, classes, description} = this.props

    return (
      <Card className={classes.card}>
        <IconButton
          aria-label="Add to favorites"
          onClick={() => this.handleFavoriteClick(content.id)}
        >
          <DeleteOutlinedIcon className={classes.icon} />
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
      dispatch(setSavedContentinDB(userId, contentId))
  }
}

SavedCarouselCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withAlert(
  connect(mapState, mapDispatch)(withStyles(styles)(SavedCarouselCard))
)
