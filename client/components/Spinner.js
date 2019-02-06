import React, {Component} from 'react'
import {css} from '@emotion/core'
import {ClipLoader} from 'react-spinners'

const override = css`
  display: block;
  margin-left: auto;
  margin-right: auto;
  border-color: red;
`

class Spinner extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
  }
  render() {
    return (
      <div className="sweet-loading">
        <ClipLoader
          css={override}
          align="center"
          sizeUnit="px"
          size={50}
          color="#123abc"
          loading={this.state.loading}
        />
      </div>
    )
  }
}

export default Spinner
