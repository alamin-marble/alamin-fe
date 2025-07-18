// server.js
const { createServer } = require('https')
const { parse } = require('url')
const next = require('next')
const cors = require('cors')
const corsOptions = {
  origin: '*', // Replace * with your specific allowed origin
};

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = 8080
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

var https = require('https');
var fs = require('fs');
try {
  var https_options = {
    key: fs.readFileSync("./path/to/private.key"),
  cert: fs.readFileSync("./path/to/CA_root.crt"),
  ca: [
  fs.readFileSync('./path/to/your_domain_name.crt'),
  fs.readFileSync('./path/to/ca_bundle_certificate.crt')
  ]
  };
} catch (err) {
  console.error('Error reading certificate files:', err);
}

app.prepare().then(() => {
  https.createServer(https_options,async (req, res) => {
    try {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.

      const parsedUrl = parse(req.url, true)
      const { pathname, query } = parsedUrl
cors(corsOptions)(req, res, async () => {
      if (pathname === '/a') {
        await app.render(req, res, '/a', query)
      } else if (pathname === '/b') {
        await app.render(req, res, '/b', query)
      } else {
        await handle(req, res, parsedUrl)
      }
});
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('website is coming soon')
    }
  })
    .once('error', (err) => {
      console.error(err)
      process.exit(1)
    })
    .listen(port, () => {
      console.log(`${process.env.NODE_ENV$}`)
      console.log(`> Ready on https://${hostname}:${port}`)
    })
})
