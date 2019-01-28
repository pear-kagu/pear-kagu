const {expect} = require('chai')
const db = require('../index')
const Interest = db.model('interest')

describe('Interest model', () => {
  beforeEach(async () => {
    try {
      const interest1 = await Interest.create({
        name: 'Javascript',
        primary: true
      })

      const interest2 = await Interest.create({
        name: 'Learn how to code',
        primary: true
      })

      const interest3 = await Interest.create({name: 'Elon Musk'})
    } catch (err) {
      console.log(err.message)
    }
  })
  it('sets primary default value to false', async () => {
    const elon = await Interest.findOne({
      where: {
        name: 'Elon Musk'
      }
    })
    expect(elon.primary).to.be.equal(false)
  })

  describe('Validations', () => {
    it('requires `name`', async () => {
      const interest = Interest.build()

      try {
        await interest.validate()
        throw Error(
          'validation was successful but should have failed without `name`'
        )
      } catch (err) {
        expect(err.message).to.contain('name cannot be null')
      }
    })

    it('requires `name` to not be an empty string', async () => {
      const interest = Interest.build({
        name: ''
      })

      try {
        await interest.validate()
        throw Error(
          'validation was successful but should have failed if name is an empty string'
        )
      } catch (err) {
        expect(err.message).to.contain('Validation error')
        /* handle error */
      }
    })
  })
})
