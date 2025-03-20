import fs from 'node:fs'
import path from 'node:path'
import { Image } from '../../models/image.js'

export const getAll = async (req, res) => {
  try {
    const images = await Image.findAll()
    return res.status(200).json({ data: images })
  } catch (e) {
    return res.status(500).json({ errors: ['Unknown error'] })
  }
}

export const getById = async (req, res) => {
  try {
    const { id } = req.params
    const image = await Image.findByPk(id)
    if (!image) {
      return res.status(404).json({ errors: ['Image not found'] })
    }
    return res.status(200).json({ data: image })
  } catch (e) {
    return res.status(500).json({ errors: ['Unknown error'] })
  }
}

export const create = async (req, res) => {
  try {
    const filename = req.filename
    const image = await Image.create({ path: filename })
    return res.status(201).json({ data: image })
  } catch (error) {
    if (error.name === 'FileValidationError') {
      return res.status(400).json({ errors: ['File not found'] })
    }
    if (error.name === 'SequelizeValidationError') {
      let errors = []
      errors = error.errors.map(error => error.message)
      return res.status(400).json({ errors })
    }
    return res.status(500).json({ errors: ['Unknown error'] })
  }
}

export const remove = async (req, res) => {
  try {
    const { id } = req.params
    const image = await Image.findByPk(id)

    if (!image) {
      return res.status(404).json({ errors: ['Image not found'] })
    }

    const filePath = path.join('public', image.path)

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    } else {
      console.log('File not found:', filePath)
    }

    await image.destroy()

    return res.status(204).json({ data: image })
  } catch (error) {
    return res.status(500).json({ errors: ['Unknown error'] })
  }
}
