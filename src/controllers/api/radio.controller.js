import { Radio } from '../../models/radio.js'
import { Category } from '../../models/category.js'
import { Image } from '../../models/image.js'
import { Country } from '../../models/country.js'

export const getAll = async (req, res) => {
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
    return res.status(200).json({ data: radios })
  } catch (error) {
    return res.status(500).json({ errors: ['Unknown error'] })
  }
}

export const getById = async (req, res) => {
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
      return res.status(404).json({ errors: ['Radio not found'] })
    }
    return res.status(200).json({ data: radio })
  } catch (error) {
    return res.status(500).json({ errors: ['Unknown error'] })
  }
}

export const create = async (req, res) => {
  try {
    const { name, description, url, countryId, imageId, categoryIds } = req.body

    const errors = []
    if (!countryId) {
      errors.push('Country is required')
    }
    if (!imageId) {
      errors.push('Image is required')
    }
    if (!categoryIds || categoryIds.length === 0) {
      errors.push('Category is required')
    }
    if (errors && errors.length > 0) {
      return res.status(400).json({ errors })
    }
    const radio = await Radio.create({
      name,
      description,
      url,
      country_id: countryId,
      image_id: imageId
    })

    await radio.addCategories(categoryIds)

    const radioComplete = await Radio.findByPk(radio.id, {
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

    return res.status(201).json({ data: radioComplete })
  } catch (error) {
    console.log(error)
    if (error.name === 'SequelizeValidationError') {
      const errors = error.errors.map(err => err.message)
      return res.status(400).json({ errors })
    }
    return res.status(500).json({ errors: ['Unknown error'] })
  }
}

export const update = async (req, res) => {
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
      return res.status(404).json({ errors: ['Radio not found'] })
    }
    const { name, description, url, countryId, imageId, categoryIds } = req.body

    const errors = []
    if (!countryId) {
      errors.push('Country is required')
    }
    if (!imageId) {
      errors.push('Image is required')
    }
    if (!categoryIds || categoryIds.length === 0) {
      errors.push('Category is required')
    }
    if (errors && errors.length > 0) {
      return res.status(400).json({ errors })
    }
    const updated = await radio.update({
      name,
      description,
      url,
      country_id: countryId,
      image_id: imageId
    })
    await radio.setCategories(Array.isArray(categoryIds) ? categoryIds : [categoryIds])
    const updatedComplete = await Radio.findByPk(updated.id, {
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

    return res.status(200).json({ data: updatedComplete })
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const errors = error.errors.map(err => err.message)
      return res.status(400).json({ errors })
    }
    return res.status(500).json({ errors: ['Unknown error'] })
  }
}

export const remove = async (req, res) => {
  try {
    const { id } = req.params
    const radio = await Radio.findByPk(id)
    if (!radio) {
      return res.status(404).json({ errors: ['Radio not found'] })
    }
    await radio.destroy({ where: { id } })
    return res.status(204).json({ data: radio })
  } catch (e) {
    return res.status(500).json({ errors: ['Unknown error'] })
  }
}
