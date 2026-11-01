const express = require('express')

const app = express()

app.get('/', (request, response) => {
  response.send('Welcome to my Express Server!')
})

app.get('/about', (request, response) => {
  response.send('This is the About Page')
})
app.get('/time', (request, response) => {
  const currentTime = new Date()
  response.send(`Current Time: ${currentTime}`)
})
app.use((request, response) => {
  response.status(404).send('404 - Page Not Found')
})
app.listen(3000, () => {
  console.log('Express server running at port 3000')
})