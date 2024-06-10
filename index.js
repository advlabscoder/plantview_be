// Use port number from the PORT environment variable or 3000 if not specified
const port = process.env.PORT || 3000;
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})