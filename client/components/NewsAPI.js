import React, {Component} from 'react'
import axios from 'axios'

export default class NewsAPI extends Component {
  constructor(props) {
    super(props)
    this.state = {
      topHeadlines: [],
      all: []
    }
  }

  async componentDidMount() {
    const topHeadlines = await axios.get('/api/newsapi/top')
    this.setState({topHeadlines: topHeadlines.articles})
    const {articles} = await axios.get('/api/newsapi/all')
    this.setState({all: articles})
  }

  render() {
    return (
      <div>
        <div>
          <h1>topHeadlines</h1>
          <ul>
            {this.state.topHeadlines.map((headline, i) => (
              <li key={headline.articles[i].url}>
                {headline.articles[i].title}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h1>all</h1>
          <ul>
            {this.state.all.map((all, i) => (
              <li key={all.articles[i].url}>{all.articles[i].title}</li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
