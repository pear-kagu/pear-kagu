/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  describe('Validations', () => {
    it('requires `email`', async () => {
      const user = User.build()

      try {
        await user.validate()
        throw Error(
          'validation was successful but should have failed without `email`'
        )
      } catch (err) {
        expect(err.message).to.contain('email cannot be null')
      }
    })

    it('requires `email` to not be an empty string', async () => {
      const user = User.build({
        email: ''
      })

      try {
        await user.validate()
        throw Error(
          'validation was successful but should have failed if email is an empty string'
        )
      } catch (err) {
        expect(err.message).to.contain('Validation error')
        /* handle error */
      }
    })
  })
  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody

      beforeEach(async () => {
        cody = await User.create({
          firstName: 'Cody',
          lastName: 'Puppy',
          email: 'cody@puppybook.com',
          password: 'bones'
        })
      })

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')
