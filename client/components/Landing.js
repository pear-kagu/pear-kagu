import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import ButtonBase from '@material-ui/core/ButtonBase'
import {LayoutBody, Typography} from '../components'
import {Link} from 'react-router-dom'
import {fetchInterests} from '../store'
import {colorBank} from '../utils'

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
  componentDidMount() {
    this.props.fetchInterests()
  }

  render() {
    const {classes, interests, isLoggedIn, user} = this.props
    return (
      <div>
        {interests ? (
          <LayoutBody
            className={classes.root}
            component="section"
            width="large"
          >
            <Typography
              variant="h4"
              marked="center"
              align="center"
              component="h2"
            >
              {isLoggedIn && user.firstName
                ? `Welcome ${
                    user.firstName
                  }, select an interest to start exploring`
                : isLoggedIn
                  ? `Welcome, select an interest to start exploring`
                  : 'Select an interest to start exploring'}
            </Typography>
            <div className={classes.images}>
              {interests.map((interestName, idx) => {
                const color = colorBank[idx]
                return (
                  <ButtonBase
                    key={interestName}
                    className={classes.imageWrapper}
                    style={{
                      width: '33%'
                    }}
                  >
                    <Link to={`/interest/${interestName}`}>
                      <div
                        className={classes.imageBackdrop}
                        style={{
                          backgroundColor: color
                        }}
                      />
                      <div className={classes.imageButton}>
                        <Typography
                          component="h3"
                          variant="h6"
                          color="inherit"
                          className={classes.imageTitle}
                        >
                          {interestName}
                          <div className={classes.imageMarked} />
                        </Typography>
                      </div>
                    </Link>
                  </ButtonBase>
                )
              })}
            </div>
          </LayoutBody>
        ) : (
          <div>Loading</div>
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
    interests: state.interests,
    isLoggedIn: !!state.user.user.id,
    user: state.user.user
  }
}

const mapDispatch = dispatch => {
  return {
    fetchInterests: () => dispatch(fetchInterests())
  }
}

export default connect(mapState, mapDispatch)(withStyles(styles)(Landing))

/**
 * PROP TYPES
 */
Landing.propTypes = {
  classes: PropTypes.object.isRequired
}
