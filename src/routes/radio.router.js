import { Router } from 'express'
import { getRadios, showSave, save, showEdit, edit, showRemove, remove, showById } from '../controllers/radio.controller.js'

export const radioRouter = Router()

radioRouter.get('/', getRadios)
radioRouter.get('/new', showSave)
radioRouter.post('/new', save)
radioRouter.get('/edit/:id', showEdit)
radioRouter.post('/edit/:id', edit)
radioRouter.get('/delete/:id', showRemove)
radioRouter.post('/delete/:id', remove)
radioRouter.get('/:id', showById)
