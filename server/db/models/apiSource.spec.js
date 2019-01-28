const {expect} = require('chai')
const db = require('../index')
const ApiSource = db.model('apiSource')

describe('ApiSource model', () => {
  describe('Validations', () => {
    it('requires `name`', async () => {
      const apiSource = ApiSource.build()

      try {
        await apiSource.validate()
        throw Error(
          'validation was successful but should have failed without `name`'
        )
      } catch (err) {
        expect(err.message).to.contain('name cannot be null')
      }
    })

    it('requires `name` to not be an empty string', async () => {
      const apiSource = ApiSource.build({
        name: ''
      })

      try {
        await apiSource.validate()
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
