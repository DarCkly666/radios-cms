import { DataTypes } from 'sequelize'
import { connection } from '../db/dbConfig.js'
import { Category } from './category.js'
import { Country } from './country.js'
import { Image } from './image.js'
import i18n from '../config/i18n.js'

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
      notEmpty: { msg: i18n.__('validations.requiredName') },
      len: {
        args: [2, 100],
        msg: i18n.__('validations.rangeLengthName')
      }
    }
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
    validate: {
      notEmpty: { msg: i18n.__('validations.requiredDescription') },
      len: {
        args: [2, 1000],
        msg: i18n.__('validations.rangeLengthDescription')
      }
    }
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
    validate: {
      notEmpty: { msg: i18n.__('validations.requiredUrl') },
      len: {
        args: [2, 500],
        msg: i18n.__('validations.rangeLengthUrl')
      },
      isUrl: { msg: i18n.__('validations.validUrl') }
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
