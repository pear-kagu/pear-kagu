import React, {Component} from 'react'
import {connect} from 'react-redux'
import InfiniteCarousel from 'react-leaf-carousel'
import {SavedCarouselCard} from '../components'

class SavedContentCarousel extends Component {
  render() {
    const {carouselId, content} = this.props

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
          >
            {carouselId === '1' ? (
              content.read.map(singleArticle => {
                return (
                  <SavedCarouselCard
                    key={singleArticle.id}
                    content={singleArticle}
                  />
                )
              })
            ) : carouselId === '2' ? (
              content.watch.map(video => {
                if (video.description) {
                  video.description = video.description.slice(0, 100) + '...'
                }
                return <SavedCarouselCard key={video.id} content={video} />
              })
            ) : carouselId === '3' ? (
              content.meet.map(meetup => {
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

SavedContentCarousel.propTypes = {}

export default connect(mapState)(SavedContentCarousel)
