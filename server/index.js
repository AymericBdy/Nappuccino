const express = require('express')
const app = express()
const bodyParser = require('body-parser');

//const cors = require('cors');

const port = 3000

app.use(express.static('public'))

// Parse requests of content-type - application/json
app.use(bodyParser.json());

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

app.get('/authtest', function (req, res) {
  console.log("Testing authentication");
  
  //Check authentication
  require('./controller/auth').validatetoken(req, res, () => {
    res.status(200).send('Auth success');
  });
})

const user = require("./controller/auth.js");
app.post('/signin', function (req, res) {
  user.signin(req,res);
});

app.listen(port, () => {
  console.log(`Nappucinno back-end listening at http://valentin.molina.pro:${port}`)
})
