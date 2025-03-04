import express from 'express'
import expressEjsLayouts from 'express-ejs-layouts'
import cookieParser from 'cookie-parser'
import { connection } from './src/db/dbConfig.js'
import { PORT } from './src/config/config.js'
import { categoryRouter, countryRouter, imageRouter, radioRouter, routerMain, userRouter, loginRouter, logoutRouter } from './src/routes/index.js'
import { authenticate } from './src/middlewares/authenticate.js'

export class Server {
  constructor () {
    this.app = express()
    this.port = PORT
  }

  start () {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`)
      this.dbConnection()
      this.middleware()
      this.routes()
    })
  }

  async dbConnection () {
    try {
      await connection.authenticate()
      await connection.sync({ alter: true })
      console.log('Database connection successful')
    } catch (error) {
      console.log(error)
    }
  }

  middleware () {
    this.app.use(express.static('public'))
    this.app.set('view engine', 'ejs')
    this.app.use(expressEjsLayouts)
    this.app.set('views', 'views/')
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(cookieParser())
  }

  routes () {
    this.app.use('/login', loginRouter)
    this.app.use('/logout', authenticate, logoutRouter)
    this.app.use('/', authenticate, routerMain)
    this.app.use('/category', authenticate, categoryRouter)
    this.app.use('/country', authenticate, countryRouter)
    this.app.use('/image', authenticate, imageRouter)
    this.app.use('/radio', authenticate, radioRouter)
    this.app.use('/user', authenticate, userRouter)
  }
}
