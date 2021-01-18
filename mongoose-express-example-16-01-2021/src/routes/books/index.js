const router = require('express').Router()
const BooksModel = require('../../models/Book')

router.get('/', async (req, res, next) => {
  try {
    const result = await BooksModel.find({}, { _id: 0, __v: 0 }).lean()

    console.info('> books retrieved: ', result)

    res.status(200).json({
      success: true,
      data: result
    })
  } catch (error) {
    console.error('> error retrieving all books: ', error.message)

    next(new Error('error retrieving books'))
  }
})

router.post('/', async (req, res, next) => {
  const {
    title, author, isbn, editions, year, sales, publisher
  } = req.body

  try {
    const result = await BooksModel.create({
      title, author, creation: Date.now(), isbn, editions, year, sales, publisher
    })

    res.status(200).json({
      success: true,
      data: result
    })
  } catch (error) {
    console.error('> error trying to create a new book on db: ', error.message)

    next(new Error('error creating new book'))
  }
})

router.put('/', async (req, res, next) => {
  const {
    title, author, isbn, editions, year, sales, publisher
  } = req.body

  try {
    const result = await BooksModel.findOneAndUpdate(
      { isbn }, // el campo por el que busca para encontrar el documento
      { title, author, isbn, editions, year, sales, publisher }, // los campos que actualiza
      { new: true } // para devolver el documento actualizado o el de antes de actualizar
    )

    console.info('> book succesfully updated: ', result)

    return res.status(200).json({
      success: true,
      data: result
    })
  } catch (error) {
    console.error('> error updating a book: ', error.message)

    next(new Error('error updating a book'))
  }
})

router.delete('/', async (req, res, next) => {
  const { isbn } = req.body

  try {
    const result = await BooksModel.findOneAndDelete({ isbn })

    console.info('> book succesfully deleted: ', result)

    res.status(200).json({
      success: true
    })
  } catch (error) {
    console.error('> error deleting a book: ', error.message)

    next(new Error('error deleting a book'))
  }
})

module.exports = router