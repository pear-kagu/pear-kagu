// test specs for type model

const {expect} = require('chai')
const db = require('../index')
const Type = db.model('types')

describe('Type model', () => {
  describe('Validations', () => {
    it('requires `type`', async () => {
      const type = Type.build()

      try {
        await type.validate()
        throw Error(
          'validation was successful but should have failed without `name`'
        )
      } catch (err) {
        expect(err.message).to.contain('type cannot be null')
      }
    })

    it('requires `type` to not be an empty string', async () => {
      const type = Type.build({
        type: ''
      })

      try {
        await type.validate()
        throw Error(
          'validation was successful but should have failed if type is an empty string'
        )
      } catch (err) {
        expect(err.message).to.contain('Validation error')
        /* handle error */
      }
    })
  })
})
