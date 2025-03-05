import { Router } from 'express'
import { categoryRouter } from './category.router.js'
import { countryRouter } from './country.router.js'
import { imageRouter } from './image.router.js'
import { radioRouter } from './radio.router.js'

const routerApi = Router()

routerApi.use('/category', categoryRouter)
routerApi.use('/country', countryRouter)
routerApi.use('/image', imageRouter)
routerApi.use('/radio', radioRouter)

export default routerApi
