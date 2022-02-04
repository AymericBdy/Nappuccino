const { Pool, Client } = require('pg')
const fs = require('fs')


try {

    const data = fs.readFileSync('../properties/bdd.json', 'utf8');

    // parse JSON string to JSON object
    const logInfo = JSON.parse(data);

} catch (err) {
    console.log(`Error reading file from disk: ${err}`);
}


const pool = new Pool(logInfo)





const text = 'INSERT INTO users(name, email) VALUES($1, $2) RETURNING *'
const values = ['brianc', 'brian.m.carlson@gmail.com']


// callback
pool.query(text, values, (err, res) => {
    if (err) {
      console.log(err.stack)
    } else {
      console.log(res.rows[0])
      // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
    }
  })
  
// ou bien
const query = {
    // give the query a unique name
    name: 'fetch-user',
    text: 'SELECT * FROM user WHERE id = $1',
    values: [1],
  }


pool.query(query, (err, res) => {
    if (err) {
      console.log(err.stack)
    } else {
      console.log(res.rows[0])
    }
  })
  

pool.query('SELECT NOW()', (err, res) => {
    console.log(err, res)
    pool.end()
  })

