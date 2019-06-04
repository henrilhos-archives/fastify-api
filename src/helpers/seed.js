const faker = require('faker')
const boom = require('boom')

const fastify = require('../server.js')

const cars = [
  {
    name: 'Tesla',
    models: ['S', 'E', 'X', 'Y']
  },
  {
    name: 'Mercedes',
    models: ['GLA', 'GLC', 'GLE', 'GLS']
  },
  {
    name: 'Audi',
    models: ['A1', 'A3', 'A4', 'A5']
  },
  {
    name: 'Ford',
    models: ['Fiesta', 'Focus', 'Fusion', 'Mustang']
  }
]

const serviceGarages = [
  'A++ Auto Services',
  'Gary\'s Garage',
  'Super Service',
  'iGarage',
  'Best Service'
]

const Car = require('../models/Car')
const Owner = require('../models/Owner')
const Service = require('../models/Service')

const generateOwnerData = () => {
  let ownerData = []
  let i = 0

  while (i < 50) {
    const firstName = faker.fake('{{name.firstName}}')
    const lastName = faker.fake('{{name.lastName}}')
    const email = faker.fake(`${firstName.toLowerCase()}.${lastName.toLowerCase()}@gmail.com`)

    const owner = {
      firstName,
      lastName,
      email
    }

    ownerData.push(owner)
    i += 1
  }

  return ownerData
}

generateCarData = ownersIds => {
  let carData = []
  let i = 0

  while (i < 1000) {
    const owner_id = faker.random.arrayElement(ownersIds)
    const carObject = faker.random.arrayElement(cars)
    const title = faker.random.arrayElement(carObject.models)
    const price = faker.random.number({ min: 5000, max: 30000 })
    const age = faker.random.number({ min: 2, max: 10 })

    const car = {
      owner_id,
      brand: carObject.name,
      title,
      price, age
    }

    carData.push(car)
    i += 1
  }

  return carData
}

const generateServiceData = carsIds => {
  let serviceData = []
  let i = 0

  while (i < 5000) {
    const car_id = faker.random.arrayElement(carsIds)
    const name = faker.random.arrayElement(serviceGarages)
    const date = faker.fake('{{date.past}}')

    const service = {
      car_id,
      name,
      date
    }

    serviceData.push(service)
    i += 1
  }

  return serviceData
}

fastify
  .ready()
  .then(async () => {
    try {
      const owners = await Owner.insertMany(generateOwnerData())
      const ownersIds = owners.map(owner => owner._id)

      const cars = await Car.insertMany(generateCarData(ownersIds))
      const carsIds = cars.map(car => car._id)

      const services = await Service.insertMany(generateServiceData(carsIds))

      console.log(`
        Data successfully added:
          - ${owners.length} owners added.
          - ${cars.length} cars added.
          - ${services.length} services added.
      `)
    } catch (err) {
      throw boom.boomify(err)
    }

    process.exit()
  }, err => {
    console.log('An error occured:', err)
    process.exit()
  })
