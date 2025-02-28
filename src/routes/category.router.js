import { Router } from 'express'
import { getAll, getById, create, save, update, deleteById } from '../controllers/category.controller.js'

export const categoryRouter = Router()

categoryRouter.get('/', getAll)
categoryRouter.get('/new', create)
categoryRouter.get('/:id', getById)
categoryRouter.post('/', save)
categoryRouter.put('/:id', update)
categoryRouter.delete('/:id', deleteById)
