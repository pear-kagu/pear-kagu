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

class Carousel extends Component {
  constructor() {
    super()
  }

  render() {
    const {classes} = this.props
    return (
      <Grid container spacing={32}>
        <Grid item xs={4}>
          <Card>
            <CardHeader
              title="Shrimp and Chorizo Paella"
              subheader="September 14, 2016"
            />
            <CardMedia
              className={classes.media}
              image="https://cdn-image.myrecipes.com/sites/default/files/styles/medium_2x/public/image/recipes/ck/00/05/spanish-paella-mr-x.jpg?itok=yw_H-lXE"
              title="Paella dish"
            />
          </Card>
        </Grid>
      </Grid>
    )
  }
}

/**
 * CONTAINER
 */

export default withStyles(styles)(Carousel)
