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
