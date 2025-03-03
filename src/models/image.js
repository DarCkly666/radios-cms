import { connection } from '../db/dbConfig.js'
import { DataTypes } from 'sequelize'
import i18n from '../config/i18n.js'

export const Image = connection.define('image', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  path: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [5, 200],
        msg: i18n.__('validations.rangeLengthPath')
      },
      notEmpty: {
        msg: i18n.__('validations.requiredImage')
      },
      notNull: {
        msg: i18n.__('validations.requiredImage')
      }
    }
  }
}, {
  timestamps: true
})
