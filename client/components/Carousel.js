import React, {Component} from 'react'
import {connect} from 'react-redux'
import {setSavedContentinDB} from '../store'
import InfiniteCarousel from 'react-leaf-carousel'
import {CarouselCard} from '../components'

class Carousel extends Component {
  render() {
    const {content, typeId} = this.props
    return (
      <div>
        {content ? (
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
            lazyLoad={false}
            arrows={true}
          >
            {typeId === '1' ? (
              content.read.map(singleArticle => {
                if (singleArticle.description) {
                  singleArticle.description =
                    singleArticle.description.slice(0, 100) + '...'
                }
                return (
                  <CarouselCard
                    key={singleArticle.id}
                    content={singleArticle}
                    description={singleArticle.description}
                  />
                )
              })
            ) : typeId === '2' ? (
              content.watch.map(video => {
                if (video.description) {
                  video.description = video.description.slice(0, 100) + '...'
                }
                return (
                  <CarouselCard
                    key={video.id}
                    content={video}
                    description={video.description}
                  />
                )
              })
            ) : typeId === '3' ? (
              content.meet.map(meetup => {
                if (meetup.description) {
                  meetup.description =
                    meetup.description
                      .replace(/<\/?[^>]+(>|$)/g, '')
                      .slice(0, 100) + '...'
                }
                return (
                  <CarouselCard
                    key={meetup.id}
                    content={meetup}
                    description={meetup.description}
                  />
                )
              })
            ) : (
              <div />
            )}
          </InfiniteCarousel>
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
    content: state.content
  }
}

const mapDispatch = dispatch => {
  return {
    setSavedContentinDB: (userId, contentId) =>
      dispatch(setSavedContentinDB(userId, contentId))
  }
}

Carousel.propTypes = {}

export default connect(mapState, mapDispatch)(Carousel)
