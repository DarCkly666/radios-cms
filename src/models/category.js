import { DataTypes } from 'sequelize'
import { connection } from '../db/dbConfig.js'

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
      notEmpty: { msg: 'Name is required' },
      len: {
        args: [2, 100],
        msg: 'Name must be between 2 and 100 characters'
      }
    }
  }
}, {
  timestamps: true
});

(async () => {
  await connection.sync({ alter: true })
})()
