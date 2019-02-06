'use strict'

const db = require('../server/db')
const {
  User,
  Type,
  Location,
  Interest,
  ApiSource
} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const locations = await Promise.all([
    Location.create({
      city: 'New York',
      state: 'NY'
    }),
    Location.create({
      city: 'San Francisco',
      state: 'CA'
    })
  ])

  console.log(`seeded ${locations.length} locations`)

  // interests model

  const interests = await Promise.all([
    Interest.create({
      name: 'Javascript',
      primary: true
    }),
    Interest.create({
      name: 'Python',
      primary: true
    }),
    Interest.create({
      name: 'Virtual Reality',
      primary: true
    }),
    Interest.create({
      name: ' Machine Learning',
      primary: true
    }),
    Interest.create({
      name: 'Data Science',
      primary: true
    }),
    Interest.create({
      name: 'Women in Tech',
      primary: true
    })
  ])
  console.log(`seeded ${interests.length} interests`)
  console.log(`seeded successfully`)

  // user model
  const users = await Promise.all([
    User.create({
      firstName: 'Cody',
      lastName: 'Puppy',
      username: 'cody123',
      locationId: '1',
      email: 'cody@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'Murphy',
      lastName: 'Dog',
      username: 'murphy-123',
      locationId: '2',
      email: 'murphy@email.com',
      password: '123'
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)

  // contentType model
  const types = await Promise.all([
    Type.create({type: 'read'}),
    Type.create({type: 'watch'}),
    Type.create({type: 'do'})
  ])
  console.log(`seeded ${types.length} content types`)
  console.log(`seeded successfully`)

  //apiSource model
  const sources = await Promise.all([
    ApiSource.create({name: 'youtubeApi', route: '/api/youtube'}),
    ApiSource.create({name: 'meetupApi', route: '/api/meetups'}),
    ApiSource.create({name: 'newsApi', route: '/api/newsapi'})
  ])
  console.log(`seeded ${sources.length} content sources`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
