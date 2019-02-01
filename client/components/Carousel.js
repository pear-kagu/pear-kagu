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

class Carousel extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.fetchContent(this.props.typeId, this.props.selectedInterest.name)
  }

  render() {
    const {classes, read, watch, meet, selectedInterest} = this.props
    return (
      <Grid>
        <Typography>{selectedInterest.name}</Typography>
        <Grid container spacing={32}>
          <Grid>
            <ArrowBackIos />
          </Grid>
          {this.props.read.typeId === 1
            ? read.map(singleArticle => {
                return (
                  <Grid key={singleArticle.id} style={cardStyle} item xs={3}>
                    <Card>
                      <IconButton aria-label="Add to favorites">
                        <FavoriteIcon />
                      </IconButton>
                      <Link to={singleArticle.sourceUrl}>
                        <CardHeader
                          title={singleArticle.title}
                          subheader="blank for now"
                        />
                        <CardMedia
                          className={classes.media}
                          image={singleArticle.imageUrl}
                          title={singleArticle.title}
                        />
                        <CardContent>
                          <Typography component="p">
                            {singleArticle.description}
                          </Typography>
                        </CardContent>
                      </Link>
                    </Card>
                  </Grid>
                )
              })
            : this.props.watch.typeId === 2
              ? watch.map(video => {
                  return (
                    <Grid key={video.id} style={cardStyle} item xs={3}>
                      <Card>
                        <IconButton aria-label="Add to favorites">
                          <FavoriteIcon />
                        </IconButton>
                        <Link to={video.sourceUrl}>
                          <CardHeader
                            title={video.title}
                            subheader="blank for now"
                          />
                          <CardMedia
                            className={classes.media}
                            image={video.imageUrl}
                            title={video.title}
                          />
                          <CardContent>
                            <Typography component="p">
                              {video.description}
                            </Typography>
                          </CardContent>
                        </Link>
                      </Card>
                    </Grid>
                  )
                })
              : meet.map(meetup => {
                  return (
                    <Grid key={meetup.id} style={cardStyle} item xs={3}>
                      <Card>
                        <IconButton aria-label="Add to favorites">
                          <FavoriteIcon />
                        </IconButton>
                        <Link to={meetup.sourceUrl}>
                          <CardHeader
                            title={meetup.Title}
                            subheader="blank for now"
                          />
                          <CardMedia
                            className={classes.media}
                            image={meetup.imageUrl}
                            title={meetup.Title}
                          />
                          <CardContent>
                            <Typography component="p">
                              {meetup.description}
                            </Typography>
                          </CardContent>
                        </Link>
                      </Card>
                    </Grid>
                  )
                })}
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
    meet: state.content.do
  }
}

const mapDispatch = dispatch => {
  return {
    fetchContent: (typeId, interestName) =>
      dispatch(fetchContent(typeId, interestName))
  }
}

export default connect(mapState, mapDispatch)(withStyles(styles)(Carousel))
