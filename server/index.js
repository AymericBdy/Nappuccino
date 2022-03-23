const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const https = require("https");
const fs = require("fs");
const logger = require('./utils/logger');
const bdd = require('./model/bdd.js')

//const cors = require('cors');

const port = 3000

app.use(express.static('public'))

// Parse requests of content-type - application/json
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Nappucinno application back-end');
  logger.logInfo("GET /");
});

app.use('/ru', require('./routes/ru.route'));

app.use('/tan', require('./routes/tan.route'));

app.use('/cafet', require('./routes/cafet.route'));

// to be removed ?
// //Examples :
// app.get('/notfound', (req, res) => {
//   res.status(404).send("Not found")
// })

app.get('/authtest', function (req, res) {
  logger.logInfo("Testing authentication", req.ip);
  
  //Check authentication
  require('./controller/auth').validatetoken(req, res, () => {
    res.status(200).send({code: 200});
  });
})

const user = require("./controller/auth.js");
const { fstat } = require('fs');
const { updateReliability } = require('./model/bdd');
app.post('/signin', function (req, res) {
  user.signin(req,res);
});

https.createServer(
  {
    key: fs.readFileSync("certs/server.key"),
    cert: fs.readFileSync("certs/server.cert")
  },
  app
).listen(port, () => {
  logger.logInfo("Nappucinno back-end listening at https://api.nappuccino.molina.pro");
});

function intervalFunc() {
  logger.logInfo('Updating reliability for cafeteria reports');
  bdd.updateReliability();
}

setInterval(intervalFunc, 1800000); //updating every 30 mins (given in ms here)
/*
app.listen(port, () => {
  logger.logInfo("Nappucinno back-end listening at https://api.nappuccino.molina.pro")
})*/
