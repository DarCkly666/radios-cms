import { Router } from 'express'
import { login, showLogin, logout } from '../controllers/auth.controller.js'

export const loginRouter = Router()
export const logoutRouter = Router()

loginRouter.get('/', showLogin)
loginRouter.post('/', login)

logoutRouter.post('/', logout)
