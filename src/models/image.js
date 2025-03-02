import { connection } from '../db/dbConfig.js'
import { DataTypes } from 'sequelize'

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
        msg: 'path must be between 5 and 200 characters'
      },
      notEmpty: {
        msg: 'image must not be empty.'
      },
      notNull: {
        msg: 'Select one image file, please.'
      }
    }
  }
}, {
  timestamps: true
})
