import express from 'express'
import next from 'next'
import routes from './routes'

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handler = routes.getRequestHandler(app)

app.prepare()
  .then(() => {
    const server = express()

    server.use(handler)

    server.get('*', (req, res) => {
      res.setHeader('Service-Worker-Allowed', '/')
      return handler(req, res)
    })

    server.listen(port, (err: Error) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
