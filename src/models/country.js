import { connection } from '../db/dbConfig.js'
import { DataTypes } from 'sequelize'
import i18n from '../config/i18n.js'

export const Country = connection.define('country', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: { msg: i18n.__('validations.requiredName') },
      len: {
        args: [2, 100],
        msg: i18n.__('validations.rangeLengthName')
      }
    }
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: i18n.__('validations.requiredCode') },
      len: {
        args: [2, 10],
        msg: i18n.__('validations.rangeLengthCode')
      }
    }
  }
}, {
  timestamps: true
})

/* (async () => {
  await connection.sync({ force: true })
})() */
