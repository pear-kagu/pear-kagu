import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {withStyles} from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  input: {
    margin: theme.spacing.unit
  },
  button: {
    margin: theme.spacing.unit
  }
})

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error, classes} = props

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        {name === 'signup' ? (
          <div>
            <div>
              <label htmlFor="firstName">
                <small>First Name</small>
              </label>
              <input name="firstName" type="text" />
            </div>
            <div>
              <label htmlFor="lastName">
                <small>Last Name</small>
              </label>
              <input name="lastName" type="text" />
            </div>
            <div>
              <label htmlFor="username">
                <small>Username</small>
              </label>
              <input name="username" type="text" />
            </div>
            <div>
              <label htmlFor="city">
                <small>City</small>
              </label>
              <input name="city" type="text" />
            </div>
            <div>
              <label htmlFor="state">
                <small>State</small>
              </label>
              <input name="state" type="text" />
            </div>
            <div>
              <label htmlFor="zipcode">
                <small>Zip Code</small>
              </label>
              <input name="zipcode" type="text" />
            </div>
          </div>
        ) : (
          <div />
        )}
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
        <Button type="submit" className={classes.button}>
          {displayName}
        </Button>
        <Button className={classes.button}>
          <a href="/auth/google">{displayName} with Google</a>
        </Button>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  )
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
            zipcode: evt.target.zipcode.value,
            password: evt.target.password.value
          })
        : (formInfo = {
            formName: evt.target.name,
            email: evt.target.email.value,
            password: evt.target.password.value
          })

      dispatch(auth(formInfo))
    }
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
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
  classes: PropTypes.object.isRequired
}
