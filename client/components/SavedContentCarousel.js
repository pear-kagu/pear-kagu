import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Grid from '@material-ui/core/Grid'
import {withStyles} from '@material-ui/core/styles'
import classnames from 'classnames'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import FavoriteIcon from '@material-ui/icons/Favorite'
import IconButton from '@material-ui/core/IconButton'
import {fetchContent} from '../store'
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos'
import ArrowBackIos from '@material-ui/icons/ArrowBackIos'

const cardStyle = {
  height: 20
}

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

class SavedContentCarousel extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.fetchContent(this.props.typeId, this.props.selectedInterest.id)
  }

  render() {
    const {classes, read, watch, meet} = this.props

    return <Typography>Pending other Carousel</Typography>
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
    selectedInterest: state.interest.selectedInterest.interest
  }
}

const mapDispatch = dispatch => {
  return {
    fetchContent: (typeId, interestId) =>
      dispatch(fetchContent(typeId, interestId))
  }
}

export default connect(mapState, mapDispatch)(
  withStyles(styles)(SavedContentCarousel)
)
