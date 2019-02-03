import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {withStyles} from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
// import { Typography } from '.';
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

const styles = theme => ({
  input: {
    margin: theme.spacing.unit
  },
  button: {
    margin: theme.spacing.unit
  },
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 150,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none'
  }
})
function getModalStyle() {
  const top = 25

  return {
    top: `${top}%`,
    margin: 'auto'
  }
}

/**
 * COMPONENT
 */
class AuthForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: true
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(evt) {
    evt.preventDefault()
    const formName = evt.target.name
    let formInfo
    formName === 'signup'
      ? (formInfo = {
          formName: evt.target.name,
          firstName: evt.target.firstName.value,
          lastName: evt.target.lastName.value,
          username: evt.target.username.value,
          email: evt.target.email.value,
          city: evt.target.city.value,
          state: evt.target.state.value,
          password: evt.target.password.value
        })
      : (formInfo = {
          formName: evt.target.name,
          email: evt.target.email.value,
          password: evt.target.password.value
        })
    this.setState({open: false})
    this.props.auth(formInfo)
  }

  render() {
    const {name, displayName, error, classes} = this.props
    return (
      <div>
        {name === 'signup' ? (
          <Dialog
            open={this.state.open}
            onClose={this.props.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <form onSubmit={this.handleSubmit} name={name}>
              <DialogTitle id="form-dialog-title">Sign Up</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Sign up below to begin saving your favorite content.
                </DialogContentText>
                <Input
                  name="firstName"
                  placeholder="First Name"
                  className={classes.input}
                  inputProps={{
                    'aria-label': 'Description'
                  }}
                />
                <Input
                  name="lastName"
                  placeholder="Last Name"
                  className={classes.input}
                  inputProps={{
                    'aria-label': 'Description'
                  }}
                />
                <Input
                  name="username"
                  placeholder="Username"
                  className={classes.input}
                  inputProps={{
                    'aria-label': 'Description'
                  }}
                />
                <Input
                  name="city"
                  placeholder="City"
                  className={classes.input}
                  inputProps={{
                    'aria-label': 'Description'
                  }}
                />
                <Input
                  name="state"
                  placeholder="State"
                  className={classes.input}
                  inputProps={{
                    'aria-label': 'Description'
                  }}
                />
                <Input
                  name="email"
                  placeholder="Email"
                  className={classes.input}
                  inputProps={{
                    'aria-label': 'Description'
                  }}
                />
                <Input
                  name="password"
                  type="password"
                  placeholder="Password"
                  className={classes.input}
                  inputProps={{
                    'aria-label': 'Description'
                  }}
                />
              </DialogContent>
              <DialogActions>
                <Button type="submit" color="primary">
                  {displayName}
                </Button>
                <Button color="primary">
                  <a href="/auth/google">{displayName} with Google</a>
                </Button>
                <Button onClick={this.props.handleClose} color="primary">
                  Close
                </Button>
                {error && error.response && <div> {error.response.data} </div>}
              </DialogActions>
            </form>
          </Dialog>
        ) : (
          <div>
            <Dialog
              open={this.state.open}
              onClose={this.props.handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Login</DialogTitle>
              <form onSubmit={this.handleSubmit} name={name}>
                <DialogContent>
                  <DialogContentText>
                    Log in to save and view saved content.
                  </DialogContentText>
                  <Input
                    name="email"
                    placeholder="Email"
                    className={classes.input}
                    inputProps={{
                      'aria-label': 'Description'
                    }}
                  />
                  <Input
                    name="password"
                    type="password"
                    placeholder="Password"
                    className={classes.input}
                    inputProps={{
                      'aria-label': 'Description'
                    }}
                  />
                </DialogContent>
                <DialogActions>
                  <Button type="submit" color="primary">
                    {displayName}
                  </Button>
                  <Button color="primary">
                    <a href="/auth/google">{displayName} with Google</a>
                  </Button>
                  <Button onClick={this.props.handleClose} color="primary">
                    Close
                  </Button>
                  {error &&
                    error.response && <div> {error.response.data} </div>}
                </DialogActions>
              </form>
            </Dialog>
          </div>
        )}
      </div>
    )
  }
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    auth: formInfo => dispatch(auth(formInfo))
  }
}

export const Login = connect(mapLogin, mapDispatch)(
  withStyles(styles)(AuthForm)
)
export const Signup = connect(mapSignup, mapDispatch)(
  withStyles(styles)(AuthForm)
)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  error: PropTypes.object,
  classes: PropTypes.object.isRequired
}
