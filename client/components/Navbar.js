import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout, fetchSearchContent} from '../store'
import {Login, Signup} from '.'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import {fade} from '@material-ui/core/styles/colorManipulator'
import {withStyles} from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import Button from '@material-ui/core/Button'
import Modal from '@material-ui/core/Modal'

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
    backgroundColor: fade(theme.palette.common.black, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.25)
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
  constructor() {
    super()
    this.state = {
      open: false,
      name: ''
    }
    this.handleClose = this.handleClose.bind(this)
  }
  handleLoginOpen = () => {
    this.setState({open: true, name: 'login'})
  }

  handleSignupOpen = () => {
    this.setState({open: true, name: 'signup'})
  }

  handleClose = () => {
    this.setState({open: false})
  }
  componentDidUpdate(prevProps) {
    if (this.props.isLoggedIn !== prevProps.isLoggedIn) {
      this.setState({open: false, name: ''})
    }
  }

  render() {
    const {classes} = this.props

    return (
      <div className={classes.root} style={{color: 'grey'}}>
        <AppBar position="static" style={{backgroundColor: 'white'}}>
          <Toolbar>
            <Typography
              className={classes.title}
              variant="h6"
              color="inherit"
              noWrap
            >
              <Link to="/">
                <img src="/kagulogo.png" className="logo-image" />
              </Link>
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
                  <Link to="/saved">Saved Content</Link>
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
                <Button
                  className={classes.button}
                  onClick={this.handleLoginOpen}
                >
                  Login
                </Button>
                <Button
                  className={classes.button}
                  onClick={this.handleSignupOpen}
                >
                  Sign Up
                </Button>
                <Modal
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                  open={this.state.open}
                  onClose={this.handleClose}
                >
                  {this.state.name === 'login' ? (
                    <Login
                      name={this.state.name}
                      handleClose={this.handleClose}
                    />
                  ) : (
                    <Signup
                      name={this.state.name}
                      handleClose={this.handleClose}
                    />
                  )}
                </Modal>
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
    isLoggedIn: !!state.user.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    },
    fetchSearchContent: interestName =>
      dispatch(fetchSearchContent(interestName))
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
