import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Login} from '.'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import {fade} from '@material-ui/core/styles/colorManipulator'
import {withStyles} from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  root: {
    width: '100%'
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    },
    position: 'relative'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit',
    width: '100%'
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  }
})

class Navbar extends Component {
  render() {
    const {classes} = this.props

    return (
      <div className={classes.root} style={{color: 'white'}}>
        <AppBar position="static" style={{backgroundColor: 'turquoise'}}>
          <Toolbar>
            <Typography
              className={classes.title}
              variant="h6"
              color="inherit"
              noWrap
            >
              <Link to="/">Kagu</Link>
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
              />
            </div>
            {this.props.isLoggedIn ? (
              <div>
                {/* The navbar will show these links after you log in */}
                <Button className={classes.button}>
                  <Link to="/savedcontent">Saved Content</Link>
                </Button>
                <Button className={classes.button}>
                  <a href="#" onClick={this.props.handleClick}>
                    Logout
                  </a>
                </Button>
              </div>
            ) : (
              <div>
                {/* The navbar will show these links before you log in */}
                <Button className={classes.button}>
                  <Login name="login" />
                </Button>
                <Button className={classes.button}>
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(withStyles(styles)(Navbar))

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired
}