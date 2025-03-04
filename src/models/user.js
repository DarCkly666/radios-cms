import { DataTypes } from 'sequelize'
import { connection } from '../db/dbConfig.js'
import i18n from '../config/i18n.js'
import { hashPassword } from '../utils/crypto.js'

export const Role = {
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest'
}

export const User = connection.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [2, 100],
        msg: i18n.__('validations.rangeLengthName')
      },
      notEmpty: {
        msg: i18n.__('validations.requiredName')
      }
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: i18n.__('validations.validEmail')
      },
      notEmpty: {
        msg: i18n.__('validations.requiredEmail')
      }
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [8, 50],
        msg: i18n.__('validations.validPassword')
      },
      notEmpty: {
        msg: i18n.__('validations.requiredPassword')
      }
    }
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: {
        args: [[Role.ADMIN, Role.USER, Role.GUEST]],
        msg: i18n.__('validations.validRole')
      },
      notEmpty: {
        msg: i18n.__('validations.requiredRole')
      }
    }
  }
},
{ timestamps: true })

User.afterValidate(async (user, options) => {
  const hashedPassword = await hashPassword(user.password)
  user.password = hashedPassword
})
