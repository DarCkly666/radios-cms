import { Router } from 'express'
import { login } from '../../controllers/api/auth.controller.js'

export const authRouter = Router()

authRouter.post('', login)
