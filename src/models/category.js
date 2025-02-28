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
      notEmpty: [true, 'Name is required'],
      max: [100, 'Name must be less than 100 characters'],
      min: [2, 'Name must be more than 2 characters']
    }
  }
}, {
  timestamps: true
});

(async () => {
  await connection.sync({ alter: true })
})()
