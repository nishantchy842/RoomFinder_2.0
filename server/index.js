const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.send('initial setup')
  })


  app.listen(8000, () => {
    console.log(`Server running is port 8000`)
  })