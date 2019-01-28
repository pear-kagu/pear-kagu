/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Content = db.model('content')

describe('Content model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('title', () => {
    describe('correctPassword', () => {
      let content1

      beforeEach(async () => {
        content1 = await Content.create({
          title: 'Getting Started With Python',
          imageUrl: 'https://www.python.org/static/opengraph-icon-200x200.png',
          description:
            'Welcome! Are you completely new to programming? If not then we presume you will be looking for information about why and how to get started with Python. Fortunately an experienced programmer in any programming language (whatever it may be) can pick up Python very quickly. Its also easy for beginners to use and learn, so jump in!',
          sourceUrl: 'https://www.python.org/about/gettingstarted/',
          publishedAt: '2019-01-28'
        })
      })

      it('has a title that is not null', () => {
        expect(content1.title).to.be.equal(true)
      })

      it('has a valid imageUrl', () => {
        expect(content1.imageUrl).to.be.equal(
          'https://www.python.org/static/opengraph-icon-200x200.png'
        )
      })

      it('has a default imageUrl', () => {
        expect(content1.imageUrl).to.be.equal(
          'https://www.python.org/static/opengraph-icon-200x200.png'
        )
      })

      it('has a description that is not empty', () => {
        expect(content1.description).to.be.equal(
          'Welcome! Are you completely new to programming? If not then we presume you will be looking for information about why and how to get started with Python. Fortunately an experienced programmer in any programming language (whatever it may be) can pick up Python very quickly. Its also easy for beginners to use and learn, so jump in!'
        )
      })

      it('has a valid sourceUrl', () => {
        expect(content1.sourceUrl).to.be.equal(
          'https://www.python.org/about/gettingstarted/'
        )
      })

      it('has a valid publishedAt date', () => {
        expect(content1.publishedAt).to.be.equal('2019-01-28')
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')
