import { Country } from '../models/country.js'

export const showAllList = async (req, res) => {
  try {
    const countries = await Country.findAll()
    return res.render('country/index', { countries })
  } catch (e) {
    return res.render('shared/error_500')
  }
}

export const showById = async (req, res) => {
  try {
    const { id } = req.params
    const country = await Country.findByPk(id)
    if (!country) {
      return res.render('shared/error_404')
    }
    return res.render('country/show', { country })
  } catch (e) {
    return res.render('shared/error_500')
  }
}

export const showNew = async (req, res) => {
  try {
    return res.render('country/new')
  } catch (e) {
    return res.render('shared/error_500')
  }
}

export const save = async (req, res) => {
  try {
    const { name, code } = req.body
    await Country.create({ name, code })
    return res.redirect('/country')
  } catch (error) {
    let errors = []
    if (error.name === 'SequelizeUniqueConstraintError') {
      errors.push('Name already exists.')
      return res.render('country/new', { errors })
    } else if (errors.name === 'SequelizeValidationError') {
      errors = error.errors.map(error => error.message)
      return res.render('country/new', { errors })
    }
    return res.render('shared/error_500')
  }
}

export const showUpdate = async (req, res) => {
  try {
    const { id } = req.params
    const country = await Country.findByPk(id)
    if (!country) {
      return res.render('shared/error_404')
    }
    return res.render('country/edit', { country })
  } catch (error) {
    return res.render('shared/error_500')
  }
}

export const update = async (req, res) => {
  const { id } = req.params
  try {
    const country = await Country.findByPk(id)
    if (!country) {
      return res.render('shared/error_404')
    }
    const { name, code } = req.body
    await Country.update({ name, code }, { where: { id } })
    return res.redirect('/country')
  } catch (error) {
    const country = await Country.findByPk(id)
    let errors = []
    if (error.name === 'SequelizeUniqueConstraintError') {
      errors.push('Name already exists.')
      return res.render('country/edit', { country, errors })
    } else if (error.name === 'SequelizeValidationError') {
      errors = error.errors.map(er => er.message)
      return res.render('country/edit', { country, errors })
    }
    return res.render('shared/error_500')
  }
}

export const showRemove = async (req, res) => {
  try {
    const { id } = req.params
    const country = await Country.findByPk(id)
    if (!country) {
      return res.render('shared/error_404')
    }
    return res.render('country/delete', { country })
  } catch (error) {
    return res.render('shared/error_500')
  }
}

export const remove = async (req, res) => {
  try {
    const { id } = req.params
    const country = await Country.findByPk(id)
    if (!country) {
      return res.render('shared/error_404')
    }
    await Country.destroy({ where: { id } })
    return res.redirect('/country')
  } catch (error) {
    return res.render('shared/error_500')
  }
}
