/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Content = db.model('content')

describe('Content model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('correct content field values validate', () => {
    let content1
    let contentMissingTitle
    let contentMissingImageUrl
    let contentMissingDescription
    let contentMissingSourceUrl
    let contentMissingPublishedAt

    beforeEach(async () => {
      content1 = await Content.create({
        title: 'Getting Started With Python',
        imageUrl: 'https://www.python.org/static/opengraph-icon-200x200.png',
        description:
          'Welcome! Are you completely new to programming? If not then we presume you will be looking for information about why and how to get started with Python. Fortunately an experienced programmer in any programming language (whatever it may be) can pick up Python very quickly. Its also easy for beginners to use and learn, so jump in!',
        sourceUrl: 'https://www.python.org/about/gettingstarted/',
        publishedAt: '2019-01-28'
      })

      contentMissingTitle = await Content.build({
        imageUrl: 'https://www.python.org/static/opengraph-icon-200x200.png',
        description:
          'Welcome! Are you completely new to programming? If not then we presume you will be looking for information about why and how to get started with Python. Fortunately an experienced programmer in any programming language (whatever it may be) can pick up Python very quickly. Its also easy for beginners to use and learn, so jump in!',
        sourceUrl: 'https://www.python.org/about/gettingstarted/',
        publishedAt: '2019-01-28'
      })

      contentMissingImageUrl = await Content.build({
        title: 'Getting Started With Python',
        description:
          'Welcome! Are you completely new to programming? If not then we presume you will be looking for information about why and how to get started with Python. Fortunately an experienced programmer in any programming language (whatever it may be) can pick up Python very quickly. Its also easy for beginners to use and learn, so jump in!',
        sourceUrl: 'https://www.python.org/about/gettingstarted/',
        publishedAt: '2019-01-28'
      })

      contentMissingDescription = await Content.build({
        title: 'Getting Started With Python',
        imageUrl: 'https://www.python.org/static/opengraph-icon-200x200.png',
        sourceUrl: 'https://www.python.org/about/gettingstarted/',
        publishedAt: '2019-01-28'
      })

      contentMissingSourceUrl = await Content.build({
        title: 'Getting Started With Python',
        imageUrl: 'https://www.python.org/static/opengraph-icon-200x200.png',
        description:
          'Welcome! Are you completely new to programming? If not then we presume you will be looking for information about why and how to get started with Python. Fortunately an experienced programmer in any programming language (whatever it may be) can pick up Python very quickly. Its also easy for beginners to use and learn, so jump in!',
        publishedAt: '2019-01-28'
      })

      contentMissingPublishedAt = await Content.build({
        title: 'Getting Started With Python',
        imageUrl: 'https://www.python.org/static/opengraph-icon-200x200.png',
        description:
          'Welcome! Are you completely new to programming? If not then we presume you will be looking for information about why and how to get started with Python. Fortunately an experienced programmer in any programming language (whatever it may be) can pick up Python very quickly. Its also easy for beginners to use and learn, so jump in!',
        sourceUrl: 'https://www.python.org/about/gettingstarted/'
      })
    })

    it('has a valid title or throws an error when null', async () => {
      expect(content1.title).to.be.equal('Getting Started With Python')

      // confirming this doesn't work at all
      try {
        await contentMissingTitle.validate()
        throw Error(
          'validation was successful but should have failed without `title`'
        )
      } catch (err) {
        // expect(err).to.exist
        expect(err.message).to.contain('title')
      }
    })

    it('has a valid imageUrl', () => {
      expect(content1.imageUrl).to.be.equal(
        'https://www.python.org/static/opengraph-icon-200x200.png'
      )
    })

    it('has a default imageUrl', () => {
      expect(contentMissingImageUrl.imageUrl).to.be.equal(
        'https://images.pexels.com/photos/97077/pexels-photo-97077.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
      )
    })

    it('has a valid description or throws an error when null', async () => {
      expect(content1.description).to.be.equal(
        'Welcome! Are you completely new to programming? If not then we presume you will be looking for information about why and how to get started with Python. Fortunately an experienced programmer in any programming language (whatever it may be) can pick up Python very quickly. Its also easy for beginners to use and learn, so jump in!'
      )
      // confirming this doesn't work at all
      try {
        await contentMissingDescription.validate()
        throw Error(
          'validation was successful but should have failed without `description`'
        )
      } catch (err) {
        // expect(err).to.exist
        expect(err.message).to.contain('description')
      }
    })

    it('has a valid sourceUrl or throws an error when null', async () => {
      expect(content1.sourceUrl).to.be.equal(
        'https://www.python.org/about/gettingstarted/'
      )
      // confirming this doesn't work at all
      try {
        await contentMissingSourceUrl.validate()
        throw Error(
          'validation was successful but should have failed without `sourceUrl`'
        )
      } catch (err) {
        // expect(err).to.exist
        expect(err.message).to.contain('sourceUrl')
      }
    })

    it('has a valid publishedAt date or throws an error when null', async () => {
      expect(content1.publishedAt).to.be.equal('2019-01-28')
      // confirming this doesn't work at all
      try {
        await contentMissingPublishedAt.validate()
        throw Error(
          'validation was successful but should have failed without `publishedAt`'
        )
      } catch (err) {
        // expect(err).to.exist
        expect(err.message).to.contain('publishedAt')
      }
    })
  }) // end describe('correct content field values')
}) // end describe('Content model')
