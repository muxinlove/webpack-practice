const express = require('express')
const app = express()

app.get('/api/info', (req, res) => {
  res.json({
    name: 'dd'
  })
})

app.listen('9092', () => {
  console.log('express start');
})