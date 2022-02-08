const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.send('Nappucinno application back-end')
  console.log("Connection from : "+req.ip)
})

app.use('/ru', require('./routes/ru.route'));

app.use('/tan', require('./routes/tan.route'));

//Examples :
app.get('/notfound', (req, res) => {
  res.status(404).send("Not found")
})

app.post('/', function (req, res) {
  res.send('Got a POST request')
})

app.listen(port, () => {
  console.log(`Nappucinno back-end listening at http://localhost:${port}`)
})
