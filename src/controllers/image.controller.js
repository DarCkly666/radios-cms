import { Image } from '../models/image.js'

export const showAll = async (req, res) => {
  try {
    const images = await Image.findAll()
    return res.render('image/index', { images })
  } catch (e) {
    return res.render('shared/error_500')
  }
}

export const showNew = async (req, res) => {
  try {
    return res.render('image/new')
  } catch (e) {
    return res.render('shared/error_500')
  }
}

export const save = async (req, res) => {
  try {
    const filename = req.filename
    await Image.create({ path: filename })
    return res.redirect('/image')
  } catch (error) {
    console.log('ERROR: ', error)
    if (error.name === 'FileValidationError') {
      return res.render('image/new', { errors: [error.message] })
    }
    if (error.name === 'SequelizeValidationError') {
      let errors = []
      errors = error.errors.map(error => error.message)
      return res.render('image/new', { errors })
    }
    return res.render('shared/error_500')
  }
}
