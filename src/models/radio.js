import { DataTypes } from 'sequelize'
import { connection } from '../db/dbConfig.js'
import { Category } from './category.js'
import { Country } from './country.js'
import { Image } from './image.js'

export const Radio = connection.define('radio', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
    validate: {
      notEmpty: { msg: 'Name is required' },
      len: {
        args: [2, 100],
        msg: 'Name must be between 2 and 100 characters'
      }
    }
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
    validate: {
      notEmpty: { msg: 'Description is required' },
      len: {
        args: [2, 1000],
        msg: 'Description must be between 2 and 1000 characters'
      }
    }
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
    validate: {
      notEmpty: { msg: 'URL is required' },
      len: {
        args: [2, 1000],
        msg: 'URL must be between 2 and 1000 characters'
      },
      isUrl: { msg: 'URL is not valid' }
    }
  }
}, {
  timestamps: true
})

Country.hasMany(Radio, {
  foreignKey: 'country_id'
})
Radio.belongsTo(Country, {
  foreignKey: 'country_id'
})

Image.hasMany(Radio, {
  foreignKey: 'image_id'
})
Radio.belongsTo(Image, {
  foreignKey: 'image_id'
})

Radio.belongsToMany(Category, {
  through: 'radio_category',
  foreignKey: 'radio_id'
})
Category.belongsToMany(Radio, {
  through: 'radio_category',
  foreignKey: 'category_id'
})
