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
import {endianness} from 'os'

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

class Carousel extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.fetchContent()
  }

  render() {
    const {classes, type} = this.props
    return (
      <Grid>
        <Typography>{type}</Typography>
        <Grid container spacing={32}>
          <Grid>
            <ArrowBackIos />
          </Grid>
          {/* {this.props.type === 1 ? } */}
          <Grid style={cardStyle} item xs={3}>
            <Card>
              <IconButton aria-label="Add to favorites">
                <FavoriteIcon />
              </IconButton>
              <Link to="/">
                <CardHeader
                  title="Shrimp and Chorizo Paella"
                  subheader="September 14, 2016"
                />
                <CardMedia
                  className={classes.media}
                  image="https://cdn-image.myrecipes.com/sites/default/files/styles/medium_2x/public/image/recipes/ck/00/05/spanish-paella-mr-x.jpg?itok=yw_H-lXE"
                  title="Paella dish"
                />
                <CardContent>
                  <Typography component="p">
                    This impressive paella is a perfect party dish and a fun
                    meal to cook together with your guests. Add 1 cup of frozen
                    peas along with the mussels, if you like.
                  </Typography>
                </CardContent>
              </Link>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card>
              <IconButton aria-label="Add to favorites">
                <FavoriteIcon />
              </IconButton>
              <Link to="/">
                <CardHeader
                  title="Shrimp and Chorizo Paella"
                  subheader="September 14, 2016"
                />
                <CardMedia
                  className={classes.media}
                  image="https://cdn-image.myrecipes.com/sites/default/files/styles/medium_2x/public/image/recipes/ck/00/05/spanish-paella-mr-x.jpg?itok=yw_H-lXE"
                  title="Paella dish"
                />
                <CardContent>
                  <Typography component="p">
                    This impressive paella is a perfect party dish and a fun
                    meal to cook together with your guests. Add 1 cup of frozen
                    peas along with the mussels, if you like.
                  </Typography>
                </CardContent>
              </Link>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card>
              <IconButton aria-label="Add to favorites">
                <FavoriteIcon />
              </IconButton>
              <Link to="/">
                <CardHeader
                  title="Shrimp and Chorizo Paella"
                  subheader="September 14, 2016"
                />
                <CardMedia
                  className={classes.media}
                  image="https://cdn-image.myrecipes.com/sites/default/files/styles/medium_2x/public/image/recipes/ck/00/05/spanish-paella-mr-x.jpg?itok=yw_H-lXE"
                  title="Paella dish"
                />
                <CardContent>
                  <Typography component="p">
                    This impressive paella is a perfect party dish and a fun
                    meal to cook together with your guests. Add 1 cup of frozen
                    peas along with the mussels, if you like.
                  </Typography>
                </CardContent>
              </Link>
            </Card>
          </Grid>
          <Grid>
            <ArrowForwardIos />
          </Grid>
        </Grid>
      </Grid>
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
    do: state.content.do
  }
}

const mapDispatch = dispatch => {
  return {
    fetchContent: () => dispatch(fetchContent())
  }
}

export default connect(mapState, mapDispatch)(withStyles(styles)(Carousel))
