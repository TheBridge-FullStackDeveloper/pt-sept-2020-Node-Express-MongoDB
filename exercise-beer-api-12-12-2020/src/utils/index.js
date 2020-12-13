const fs = require('fs')

const read = async path => {
  const raw = await fs.readFileSync(path)
  return JSON.parse(raw)
}

const write = async (path, content) => {
  const contentStr = typeof content === 'string' ? content : JSON.stringify(content)
  await fs.writeFileSync(path, contentStr)
}

const loggerError = ({ message }, custom) => {
  console.error(`> ${custom || 'error'}: ${message}`)
}

const resError = (res, code, message) => {
  return res.status(code).json({
    success: false,
    message: message || 'something went wrong'
  })
}

module.exports = {
  read,
  write,
  loggerError,
  resError
}