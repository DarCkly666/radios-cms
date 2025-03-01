import { Router } from 'express'
import { getAll, getById, create, save, update, deleteById, edit, remove } from '../controllers/category.controller.js'

export const categoryRouter = Router()

categoryRouter.get('/', getAll)
categoryRouter.get('/new', create)
categoryRouter.get('/:id', getById)
categoryRouter.post('/', save)
categoryRouter.get('/edit/:id', edit)
categoryRouter.post('/edit/:id', update)
categoryRouter.get('/delete/:id', remove)
categoryRouter.post('/delete/:id', deleteById)
