import fs from 'node:fs'
import path from 'node:path'
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

export const showRemove = async (req, res) => {
  try {
    const { id } = req.params
    const image = await Image.findByPk(id)
    if (!image) {
      return res.render('shared/error_404')
    }
    return res.render('image/delete', { image })
  } catch (error) {
    return res.render('shared/error_500')
  }
}

export const remove = async (req, res) => {
  try {
    const { id } = req.params
    const image = await Image.findByPk(id)

    if (!image) {
      return res.render('shared/error_404')
    }

    const filePath = path.join('public', image.path)

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    } else {
      console.log('File not found:', filePath)
    }

    await image.destroy()

    return res.redirect('/image')
  } catch (error) {
    return res.render('shared/error_500')
  }
}
