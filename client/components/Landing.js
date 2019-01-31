import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import ButtonBase from '@material-ui/core/ButtonBase'
import {LayoutBody, Typography} from '../components'
import {Link} from 'react-router-dom'
import {fetchInterests} from '../store'

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 8,
    marginBottom: theme.spacing.unit * 4
  },
  images: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexWrap: 'wrap'
  },
  imageWrapper: {
    position: 'relative',
    display: 'block',
    padding: 0,
    borderRadius: 0,
    height: '40vh',
    [theme.breakpoints.down('sm')]: {
      width: '100% !important',
      height: 100
    },
    '&:hover': {
      zIndex: 1
    },
    '&:hover $imageBackdrop': {
      opacity: 0.15
    },
    '&:hover $imageMarked': {
      opacity: 0
    },
    '&:hover $imageTitle': {
      border: '4px solid currentColor'
    }
  },
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%'
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: theme.palette.common.black,
    opacity: 0.5,
    transition: theme.transitions.create('opacity')
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme
      .spacing.unit + 6}px`
  },
  imageMarked: {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity')
  }
})

class Landing extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.fetchInterests()
  }

  render() {
    const {classes} = this.props
    const {allInterests} = this.props

    const categories = [
      {
        title: 'Javascript',
        width: '40%',
        color: 'purple'
      },
      {
        title: 'Python',
        width: '20%',
        color: 'green'
      },
      {
        title: 'Women Who Code',
        width: '40%',
        color: 'blue'
      },
      {
        title: 'Learn to Code',
        width: '30%',
        color: 'turquoise'
      },
      {
        title: 'C++',
        width: '40%',
        color: 'gray'
      },
      {
        title: 'Machine Learning',
        width: '30%',
        color: 'orange'
      }
    ]
    return (
      <LayoutBody className={classes.root} component="section" width="large">
        <Typography variant="h4" marked="center" align="center" component="h2">
          Select a category to get started
        </Typography>
        <div className={classes.images}>
          {allInterests.map(category => (
            <ButtonBase
              key={category.title}
              className={classes.imageWrapper}
              style={{
                width: category.width
              }}
            >
              <Link to={`/interest/${allInterests.title}`}>
                <div
                  className={classes.imageBackdrop}
                  style={{
                    backgroundColor: category.color
                  }}
                />
                <div className={classes.imageButton}>
                  <Typography
                    component="h3"
                    variant="h6"
                    color="inherit"
                    className={classes.imageTitle}
                  >
                    {category.title}
                    <div className={classes.imageMarked} />
                  </Typography>
                </div>
              </Link>
            </ButtonBase>
          ))}
        </div>
      </LayoutBody>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    allInterests: state.interest.allInterests
  }
}

const mapDispatch = dispatch => {
  return {
    fetchInterests: () => dispatch(fetchInterests())
  }
}

export default withStyles(styles)(Landing)

/**
 * PROP TYPES
 */
Landing.propTypes = {
  classes: PropTypes.object.isRequired
}
