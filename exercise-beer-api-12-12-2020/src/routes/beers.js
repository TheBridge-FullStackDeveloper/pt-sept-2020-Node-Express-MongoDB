const express = require('express')
const router = express.Router()

const { read, write, loggerError, resError } = require('../utils')
const { BEERS_DB, BASE_URL } = require('../constants')

// Service to get all firsts 25 beers
router.get('/', async (req, res) => {
  try {
    const beersList = (await read(BEERS_DB)).slice(0, 25)

    return res.status(200).json({
      success: true,
      length: beersList.length,
      data: beersList
    })
  } catch (error) {
    loggerError(error, 'error at /')
    return resError(res, 500)
  }
})

// Service to get a random beer
router.get('/random', async (req, res) => {
  try {
    const beersList = await read(BEERS_DB)

    return res.status(200).json({
      success: true,
      data: beersList[~~(Math.random() * beersList.length)]
    })
  } catch (error) {
    loggerError(error, 'error at /random')
    return resError(res, 500)
  }
})

// Service to add a new beer
router.post('/new', async (req, res) => {
  try {
    const { name, tagline, first_brewed, description, image_url } = req.body

    if (!name || !tagline || !first_brewed || !description) {
      return resError(res, 400, 'some mandatory field is empty')
    }

    const beersList = await read(BEERS_DB)

    const beerRepeated = beersList.find(beer => beer.name === name)

    if (beerRepeated) {
      return resError(res, 400, 'the beer already exist')
    }

    const newBeersList = [
      ...beersList,
      {
        id: beersList.length + 1,
        name,
        tagline,
        first_brewed,
        description,
        image_url
      }
    ]

    await write(BEERS_DB, newBeersList)

    return res.status(200).json({
      success: true,
      length: newBeersList.length,
      data: newBeersList
    })
  } catch (error) {
    loggerError(error, 'error at /new')
    return resError(res, 500)
  }
})

// Service to get one beer by its id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params

    const beersList = await read(BEERS_DB)

    const beer = beersList.find(beer => beer.id === +id)

    return res.status(200).json({
      success: true,
      data: beer || {}
    })
  } catch (error) {
    loggerError(error, 'error at /:id')
    return resError(res, 500)
  }
})

// Service to get a page of beers
router.get('/page/:page/count/:count', async (req, res) => {
  try {
    const { page, count } = req.params

    const beersList = await read(BEERS_DB)

    const beersSegment = beersList.slice((page * count) - count, page * count)

    const nextPage = () =>
      !beersSegment.length || beersSegment.length < count ?
        null : `${BASE_URL}/beers/page/${+page + 1}/count/${count}`

    return res.status(200).json({
      success: true,
      length: beersSegment.length,
      next: nextPage(),
      data: beersSegment
    })
  } catch (error) {
    loggerError(error, 'error at /page/:page/count/:count')
    return resError(res, 500)
  }
})

module.exports = router