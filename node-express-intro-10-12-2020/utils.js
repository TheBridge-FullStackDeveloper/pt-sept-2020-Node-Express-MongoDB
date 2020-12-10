const errorManager = (res, { message }) => {
  console.error('> error reading file: ', message)
  res.send('Something went wrong')
}

module.exports = {
  errorManager
}