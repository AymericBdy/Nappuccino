const express = require('express');
const bodyParser = require('body-parser');
const https = require("https");
const fs = require("fs");

const user = require("./controller/auth.js");
const logger = require('./utils/logger');

//const cors = require('cors');

const app = express();
const port = 3000
app.use(express.static('public'))
// Parse requests of content-type - application/json
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Nappucinno application back-end')
  logger.logInfo("Connection from : ", req.ip)
})

app.use('/ru', require('./routes/ru.route'));

app.use('/tan', require('./routes/tan.route'));

app.use('/cafet', require('./routes/cafet.route'));

app.get('/authtest', function (req, res) {
  logger.logInfo("Testing authentication", req.ip);
  
  //Check authentication
  user.validatetoken(req, res, () => {
    res.status(200).send({code: 200});
  });
})

const { fstat } = require('fs');
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
  logger.logInfo(`Nappucinno back-end listening at https://valentin.molina.pro:${port}`);
});

/*app.listen(port, () => {
  logger.logInfo(`Nappucinno back-end listening at http://valentin.molina.pro:${port}`)
})*/
