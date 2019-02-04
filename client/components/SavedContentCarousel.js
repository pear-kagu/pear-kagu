import React, {Component} from 'react'
import {connect} from 'react-redux'
import InfiniteCarousel from 'react-leaf-carousel'
import {SavedCarouselCard} from '../components'

class SavedContentCarousel extends Component {
  constructor() {
    super()
    this.state = {
      render: ''
    }
  }

  componentDidMount() {
    this.setState({render: 'render'})
  }

  render() {
    const {contents} = this.props
    console.log('contents in carousel', contents)
    const read = contents.filter(content => {
      return content.typeId === 1
    })
    console.log('read', read)
    console.log('state in carousel', this.state)
    const watch = contents.filter(content => {
      return content.typeId === 2
    })
    const meet = contents.filter(content => {
      return content.typeId === 3
    })

    return (
      <InfiniteCarousel
        breakpoints={[
          {
            breakpoint: 500,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3
            }
          }
        ]}
        dots={false}
        showSides={true}
        sidesOpacity={0.5}
        sideSize={0.1}
        slidesToScroll={4}
        slidesToShow={4}
        scrollOnDevice={true}
        lazyLoad={true}
      >
        {this.props.carouselId === '1' ? (
          read.map(singleArticle => {
            return (
              <SavedCarouselCard
                key={singleArticle.id}
                content={singleArticle}
              />
            )
          })
        ) : this.props.carouselId === '2' ? (
          watch.map(video => {
            if (video.description) {
              video.description = video.description.slice(0, 100) + '...'
            }
            return <SavedCarouselCard key={video.id} content={video} />
          })
        ) : this.props.carouselId === '3' ? (
          meet.map(meetup => {
            let removedHtmlDescription
            if (meetup.description) {
              removedHtmlDescription =
                meetup.description
                  .replace(/<\/?[^>]+(>|$)/g, '')
                  .slice(0, 100) + '...'
            }
            return (
              <SavedCarouselCard
                key={meetup.id}
                content={meetup}
                removedHtmlDescription={removedHtmlDescription}
              />
            )
          })
        ) : (
          <div />
        )}
      </InfiniteCarousel>
    )
  }
}

/**
 * CONTAINER
 */

const mapState = state => {
  return {
    contents: state.content,
    user: state.user
  }
}

SavedContentCarousel.propTypes = {}

export default connect(mapState)(SavedContentCarousel)
