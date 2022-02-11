const { Pool, Client } = require('pg')
const fs = require('fs')


// Connect to database
const data = fs.readFileSync('../properties/bdd.json', 'utf8');
// parse JSON string to JSON object
const logInfo = JSON.parse(data);
const pool = new Pool(logInfo)



const text = 'INSERT INTO users(report_count, status) VALUES($1, $2)'
const values = ['0', 'admin']


// callback
pool.query(text, values, (err, res) => {
    if (err) {
      console.log(err.stack)
    } else {
      console.log(res.rows[0])
      // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
    }
  })

pool.end()