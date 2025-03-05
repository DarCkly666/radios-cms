import { Country } from '../../models/country.js'

export const getAll = async (req, res) => {
  try {
    const countries = await Country.findAll()
    return res.status(200).json({ data: countries })
  } catch (e) {
    return res.status(500).json({ errors: ['Unknown error'] })
  }
}

export const getById = async (req, res) => {
  try {
    const { id } = req.params
    const country = await Country.findByPk(id)
    if (!country) {
      return res.status(404).json({ errors: ['Country not found'] })
    }
    return res.status(200).json({ data: country })
  } catch (e) {
    return res.status(500).json({ errors: ['Unknown error'] })
  }
}

export const create = async (req, res) => {
  try {
    const { name, code } = req.body
    const country = await Country.create({ name, code })
    return res.status(201).json({ data: country })
  } catch (error) {
    let errors = []
    if (error.name === 'SequelizeUniqueConstraintError') {
      errors.push('Country already exists')
      return res.status(409).json({ errors })
    } else if (error.name === 'SequelizeValidationError') {
      errors = error.errors.map(error => error.message)
      return res.status(400).json({ errors })
    }
    return res.status(500).json({ errors: ['Unknown error'] })
  }
}

export const update = async (req, res) => {
  try {
    const { id } = req.params
    const country = await Country.findByPk(id)
    if (!country) {
      return res.status(404).json({ errors: ['Country not found'] })
    }
    const { name, code } = req.body
    await country.update({ name, code })
    return res.status(200).json({ data: country })
  } catch (error) {
    let errors = []
    if (error.name === 'SequelizeUniqueConstraintError') {
      errors.push('Country already exists')
      return res.status(409).json({ errors })
    } else if (error.name === 'SequelizeValidationError') {
      errors = error.errors.map(er => er.message)
      return res.status(400).json({ errors })
    }
    return res.status(500).json({ errors: ['Unknown error'] })
  }
}

export const remove = async (req, res) => {
  try {
    const { id } = req.params
    const country = await Country.findByPk(id)
    if (!country) {
      return res.status(404).json({ errors: ['Country not found'] })
    }
    await country.destroy()
    return res.status(204).json({ data: country })
  } catch (error) {
    return res.status(500).json({ errors: ['Unknown error'] })
  }
}
