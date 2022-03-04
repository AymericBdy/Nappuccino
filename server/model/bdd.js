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




async function addDispenserReport(date, report_type, comment, dispenser_id, login_ecn){
    const rows = await query('INSERT INTO report_dispenser(date, report_type, comment, validation_count, dispenser_id, login_ecn)'+
        'VALUES($1,$2,$3,$4,$5,$6);'+
        'UPDATE users SET report_count = report_count + 1 WHERE login_ecn = $6',
        [date, report_type, comment, 0, dispenser_id, login_ecn]
    );
    return rows
}

// TO DO
async function addRuReport(date, report_type, comment, dispenser_id, login_ecn){
  const rows = await query('INSERT INTO report_dispenser(date, report_type, comment, validation_count, login_ecn)'+
      'VALUES($1,$2,$3,$4,$5,$6);'+
      'UPDATE users SET report_count = report_count + 1 WHERE user_id = $6',
      [date, report_type, comment, 0, dispenser_id, login_ecn]
  );
  return rows
}


async function addDispenser(dispenser_type){
  const rows = await query('INSERT INTO dispenser(dispenser_type, dispenser_status) VALUES($1,$2)',
      [dispenser_type, 'fonctionnel']
  );
  return rows
}

async function addIssue(message,login_ecn){
  const rows = await query('INSERT INTO issues(message, login_ecn) VALUES($1,$2)',
      [message,login_ecn]
  );
  return rows
}

async function upvoteRU(report_id){
  const rows = await query('UPDATE report_ru SET validation_count = validation_count + 1 WHERE report_ru_id = $1',
      [report_id]
  );
  return rows
}

async function upvoteDispenser(report_id){
  const rows = await query('UPDATE report_dispenser SET validation_count = validation_count + 1 WHERE report_dispenser_id = $1',
     [report_id]
  );
  return rows
}

async function downvoteRU(report_id){
  const rows = await query('UPDATE report_ru SET validation_count = validation_count - 1 WHERE report_ru_id = $1',
      [report_id]
  );
  return rows
}

async function downvoteDispenser(report_id){
  const rows = await query('UPDATE report_dispenser SET validation_count = validation_count - 1 WHERE report_dispenser_id = $1',
      [report_id]
  );
  return rows
}


async function updateDispenserStatus(status,dispenser_id){
  const rows = await query('UPDATE dispenser SET dispenser_status = $1 WHERE dispenser_id = $2',
      [status, dispenser_id]
  );
  return rows
}

module.exports = {
  testAndAddEcnUser
}