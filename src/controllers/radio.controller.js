import { Radio } from '../models/radio.js'
import { Category } from '../models/category.js'
import { Image } from '../models/image.js'
import { Country } from '../models/country.js'

export const getRadios = async (req, res) => {
  try {
    const radios = await Radio.findAll({
      include: [
        {
          model: Country,
          attributes: ['id', 'name']
        },
        {
          model: Image,
          attributes: ['id', 'path']
        },
        {
          model: Category,
          attributes: ['id', 'name'],
          through: { attributes: [] }
        }
      ]
    })
    res.render('radio/index', { radios })
  } catch (error) {
    res.render('shared/error_500')
  }
}

export const showSave = async (req, res) => {
  try {
    const countries = await Country.findAll()
    const images = await Image.findAll()
    const categories = await Category.findAll()
    return res.render('radio/new', { countries, images, categories })
  } catch (error) {
    res.render('shared/error_500')
  }
}

export const save = async (req, res) => {
  try {
    const countries = await Country.findAll()
    const images = await Image.findAll()
    const categories = await Category.findAll()
    const { name, description, url, countryId, imageId, categoryIds } = req.body

    const errors = []
    if (!countryId) {
      errors.push('Select one country, please.')
    }
    if (!imageId) {
      errors.push('Select one image, please.')
    }
    if (!categoryIds || categoryIds.length === 0) {
      errors.push('Select at least one category, please.')
    }
    if (errors && errors.length > 0) {
      console.log(errors)
      return res.render('radio/new', { countries, images, categories, errors })
    }
    const radio = await Radio.create({
      name,
      description,
      url,
      country_id: countryId,
      image_id: imageId
    })

    // Asociar las categorías seleccionadas con la radio
    await radio.addCategories(categoryIds)

    // Redirigir o enviar una respuesta de éxito
    return res.redirect('/radio')
  } catch (error) {
    console.log(error)
    const countries = await Country.findAll()
    const images = await Image.findAll()
    const categories = await Category.findAll()
    // Manejar errores de validación de Sequelize
    if (error.name === 'SequelizeValidationError') {
      const errors = error.errors.map(err => err.message)
      return res.render('radio/new', { countries, images, categories, errors })
    }

    // Manejar otros errores
    return res.render('shared/error_500')
  }
}

export const showEdit = async (req, res) => {
  try {
    const { id } = req.params
    const radio = await Radio.findByPk(id, {
      include: [
        {
          model: Country,
          attributes: ['id', 'name']
        },
        {
          model: Image,
          attributes: ['id', 'path']
        },
        {
          model: Category,
          attributes: ['id', 'name'],
          through: { attributes: [] }
        }
      ]
    })
    if (!radio) {
      return res.render('shared/error_404')
    }
    const countries = await Country.findAll()
    const images = await Image.findAll()
    const categories = await Category.findAll()
    return res.render('radio/edit', { radio, countries, images, categories })
  } catch (error) {
    return res.render('shared/error_500')
  }
}

export const edit = async (req, res) => {
  try {
    const { id } = req.params
    const radio = await Radio.findByPk(id, {
      include: [
        {
          model: Country,
          attributes: ['id', 'name']
        },
        {
          model: Image,
          attributes: ['id', 'path']
        },
        {
          model: Category,
          attributes: ['id', 'name'],
          through: { attributes: [] }
        }
      ]
    })
    if (!radio) {
      return res.render('shared/error_404')
    }
    const countries = await Country.findAll()
    const images = await Image.findAll()
    const categories = await Category.findAll()
    const { name, description, url, countryId, imageId, categoryIds } = req.body

    const errors = []
    if (!countryId) {
      errors.push('Select one country, please.')
    }
    if (!imageId) {
      errors.push('Select one image, please.')
    }
    if (!categoryIds || categoryIds.length === 0) {
      errors.push('Select at least one category, please.')
    }
    if (errors && errors.length > 0) {
      return res.render('radio/edit', { radio, countries, images, categories, errors })
    }
    await Radio.update({
      name,
      description,
      url,
      country_id: countryId,
      image_id: imageId
    }, {
      where: {
        id
      }
    })
    await radio.setCategories(Array.isArray(categoryIds) ? categoryIds : [categoryIds])

    return res.redirect('/radio')
  } catch (error) {
    const { id } = req.params
    const radio = await Radio.findByPk(id, {
      include: [
        {
          model: Country,
          attributes: ['id', 'name']
        },
        {
          model: Image,
          attributes: ['id', 'path']
        },
        {
          model: Category,
          attributes: ['id', 'name'],
          through: { attributes: [] }
        }
      ]
    })
    const countries = await Country.findAll()
    const images = await Image.findAll()
    const categories = await Category.findAll()
    // Manejar errores de validación de Sequelize
    if (error.name === 'SequelizeValidationError') {
      const errors = error.errors.map(err => err.message)
      return res.render('radio/edit', { radio, countries, images, categories, errors })
    }

    return res.render('shared/error_500')
  }
}

export const showRemove = async (req, res) => {
  try {
    const { id } = req.params
    const radio = await Radio.findByPk(id, {
      include: [
        {
          model: Country,
          attributes: ['id', 'name']
        },
        {
          model: Image,
          attributes: ['id', 'path']
        },
        {
          model: Category,
          attributes: ['id', 'name'],
          through: { attributes: [] }
        }
      ]
    })
    if (!radio) {
      return res.render('shared/error_404')
    }
    return res.render('radio/delete', { radio })
  } catch (error) {
    return res.render('shared/error_500')
  }
}

export const remove = async (req, res) => {
  try {
    const { id } = req.params
    const radio = await Radio.findByPk(id)
    if (!radio) {
      return res.render('shared/error_404')
    }
    await Radio.destroy({ where: { id } })
    return res.redirect('/radio')
  } catch (e) {
    return res.render('shared/error_500')
  }
}

export const showById = async (req, res) => {
  try {
    const { id } = req.params
    const radio = await Radio.findByPk(id, {
      include: [
        {
          model: Country,
          attributes: ['id', 'name']
        },
        {
          model: Image,
          attributes: ['id', 'path']
        },
        {
          model: Category,
          attributes: ['id', 'name'],
          through: { attributes: [] }
        }
      ]
    })
    if (!radio) {
      return res.render('shared/error_404')
    }
    return res.render('radio/show', { radio })
  } catch (error) {
    return res.render('shared/error_500')
  }
}
