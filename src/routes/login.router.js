import { Router } from 'express'
import { login, showLogin } from '../controllers/auth.controller.js'

export const loginRouter = Router()

loginRouter.get('/', showLogin)
loginRouter.post('/', login)
