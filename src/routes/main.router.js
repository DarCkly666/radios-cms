import { Router } from 'express'
import { main } from '../controllers/main.controller.js'

export const routerMain = Router()

routerMain.get('/', main)
