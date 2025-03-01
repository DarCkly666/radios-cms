import { connection } from '../db/dbConfig.js'
import { DataTypes } from 'sequelize'

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
      notEmpty: { msg: 'Name must not be empty.' },
      len: {
        args: [2, 100],
        msg: 'Name must be between 2 and 100 characters.'
      }
    }
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Code field must not be emtpy.' },
      len: {
        args: [2, 10],
        msg: 'Code must be between 2 and 100 characters.'
      }
    }
  }
}, {
  timestamps: true
})

/* (async () => {
  await connection.sync({ force: true })
})() */
