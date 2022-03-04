const { Pool, Client } = require('pg');
const fs = require('fs');
const logger = require('../utils/logger.js');

// Connect to database
const data = fs.readFileSync('properties/bdd.json', 'utf8');
// parse JSON string to JSON object
const logInfo = JSON.parse(data);
const pool = new Pool(logInfo);

async function query(query, params) {
  const {rows, fields} = await pool.query(query, params);

  return rows;
}

async function addEcnUser(userEcn) {

  const rows = await query('INSERT INTO users(login_ecn, report_count, priviledge) VALUES($1, $2, $3)',
    [userEcn, 0, 'user']
  );

  //to do : gestion des exeptions.
}

async function doesEcnUserExist(userEcn) {

  logger.logInfo(`Testing if user ${userEcn} exists in the database.`);
  const rows = await query('SELECT login_ecn FROM users WHERE login_ecn = $1', [userEcn]);
  return Object.keys(rows).length !== 0;

}

function testAndAddEcnUser(userEcn){
  doesEcnUserExist(userEcn).then(exist => {
    if(!exist) {
      addEcnUser(userEcn);
      logger.logInfo(`Adding user ${userEcn}.`);
    } else {
      logger.logInfo(`User ${userEcn} already exists.`);
    }
  });
}

module.exports = {
  testAndAddEcnUser
}