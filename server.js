import express from 'express'
import { connection } from './src/db/dbConfig.js'
import { PORT } from './src/config/config.js'
import { categoryRouter } from './src/routes/category.router.js'

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
      // await connection.sync({ force: true })
      console.log('Database connection successful')
    } catch (error) {
      console.log(error)
    }
  }

  middleware () {
    this.app.use(express.static('public'))
    this.app.set('view engine', 'ejs')
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
  }

  routes () {
    this.app.use('/category', categoryRouter)
  }
}
