import { DataTypes } from 'sequelize'
import { connection } from '../db/dbConfig.js'
import i18n from '../config/i18n.js'

export const Category = connection.define('category', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: { msg: i18n.__('validations.requiredName') },
      len: {
        args: [2, 100],
        msg: i18n.__('validations.rangeLengthName')
      }
    }
  }
}, {
  timestamps: true
})

/* (async () => {
  await connection.sync({ force: true })
})() */
