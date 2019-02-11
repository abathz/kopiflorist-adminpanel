let express = require('express')
let next = require('next')
let routes = require('./routes')

const port = process.env.PORT || 3001
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

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port} [${dev ? 'Development' : 'Production'}]`)
    })
  })
