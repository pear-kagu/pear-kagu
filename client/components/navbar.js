import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Login} from '../components'

class Navbar extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <Link to="/" id="homeIcon">
            <h1>Pear-Kagu</h1>
          </Link>
          <div>
            <input type="text" id="searc" name="search" />
            <button type="submit">
              <label htmlFor="search">Search</label>
            </button>
          </div>
          {this.props.isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <h4>My Favorites</h4>
              <a href="#" onClick={this.props.handleClick}>
                Logout
              </a>
              <Link to="/savedcontent">Saved Content</Link>
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <Login name="login" />
              {/* <Link to="/login">Login</Link> */}
              <Link to="/signup">Sign Up</Link>
            </div>
          )}
        </nav>
        <hr />
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

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
