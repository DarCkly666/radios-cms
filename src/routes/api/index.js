import { Router } from 'express'
import { categoryRouter } from './category.router.js'

const routerApi = Router()

routerApi.use('/category', categoryRouter)

export default routerApi
