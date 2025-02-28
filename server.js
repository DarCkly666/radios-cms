import express from 'express'

export class Server {
  constructor () {
    this.app = express()
    this.port = 3000
  }

  start () {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`)
    })
  }
}
