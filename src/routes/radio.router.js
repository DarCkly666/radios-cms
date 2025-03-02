import { Router } from 'express'
import { getRadios, showSave } from '../controllers/radio.controller.js'

export const radioRouter = Router()

radioRouter.get('/', getRadios)
radioRouter.get('/new', showSave)
