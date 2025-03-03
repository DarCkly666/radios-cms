import { Category } from '../models/category.js'
import { Country } from '../models/country.js'
import { Image } from '../models/image.js'
import { Radio } from '../models/radio.js'

export const main = async (req, res) => {
  try {
    const categories = await Category.findAll()
    const countries = await Country.findAll()
    const images = await Image.findAll()
    const radios = await Radio.findAll()
    res.render('index', { categories, countries, images, radios })
  } catch (error) {
    console.log(error)
    res.render('shared/error_500')
  }
}
