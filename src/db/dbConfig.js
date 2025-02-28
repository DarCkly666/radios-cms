import { Sequelize } from 'sequelize'
import { DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER, NODE_ENV } from '../config/config.js'

export const connection = (NODE_ENV === 'production')
  ? new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'postgres',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  })
  : new Sequelize('sqlite://.data/db.sqlite')
