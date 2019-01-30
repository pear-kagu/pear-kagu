const {expect} = require('chai')
const db = require('../index')

const Location = db.model('location')

describe('Location Model', () => {
  describe('Validations', () => {
    let location

    beforeEach(() => {
      location = Location.build()
    })

    it('requires `city`', async () => {
      //location.city = 'Brooklyn'
      location.state = 'New York'

      try {
        await location.validate()
        throw new Error('validate succeeded by should have failed')
      } catch (err) {
        expect(err.message).to.contain('city')
      }
    })

    it('requires `state`', async () => {
      location.city = 'Brooklyn'
      // location.state = 'New York'

      try {
        await location.validate()
        throw new Error('validate succeeded by should have failed')
      } catch (err) {
        expect(err.message).to.contain('state')
      }
    })
  }) // end describe('Validations')
}) // end describe('Location Model')
