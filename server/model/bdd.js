const { Pool, Client } = require('pg');
const fs = require('fs');
const logger = require('../utils/logger.js');
const { nextTick } = require('process');

// Connection to database
const logInfo = JSON.parse(fs.readFileSync('properties/bdd.json', 'utf8'));
const pool = new Pool(logInfo);


// -------------------- Query Handling -------------------- //
async function query(query, params, callback) {
  pool.query(query, params, (err, result) => {
    if(err) {
      logger.logFatal("Can't execute the desired query.");
      logger.logFatal("Error stack is : "+err.stack);
      // raise exception ?
    } else {
      if(typeof callback === 'function') {
        callback(result.rows);
      }
    }
  });
}


// -------------------- Users Handling -------------------- //
async function addEcnUser(userEcn) {
  query('INSERT INTO users(login_ecn, report_count, priviledge) VALUES($1, $2, $3)',
    [userEcn, 0, 'user']
  );
}

async function doesEcnUserExist(userEcn, callback) {
  logger.logInfo(`Testing if user ${userEcn} exists in the database.`);
  query(
    'SELECT login_ecn FROM users WHERE login_ecn = $1', 
    [userEcn],
    (rows) => {callback(Object.keys(rows).length !== 0);} );
}

async function testAndAddEcnUser(userEcn){
  doesEcnUserExist(userEcn, (exist) => {
    if(!exist) {
      addEcnUser(userEcn);
      logger.logInfo(`Adding user ${userEcn}.`);
    } else {
      logger.logInfo(`User ${userEcn} already exists.`);
    }
  });
}


// -------------------- Cafet' & Dispenser -------------------- //
// TO DO
async function getDispensers(callback) {
  query(
    'SELECT dispenser_id, dispenser_type, dispenser_status FROM public.dispenser;',
    [],
    (rows) => {
      logger.logInfo(rows);
      callback(rows);
    });
}

async function getDispenserInfos(machineId) {
  //wip
}

async function updateDispenserStatus(status,dispenser_id){
  query('UPDATE dispenser SET dispenser_status = $1 WHERE dispenser_id = $2',
      [status, dispenser_id]
  );
}

async function addDispenser(dispenser_type){
  query('INSERT INTO dispenser(dispenser_type, dispenser_status) VALUES($1,$2)',
      [dispenser_type, 'fonctionnel']
  );
}

async function addDispenserReport(date, report_type, comment, dispenser_id, login_ecn){
    query('INSERT INTO report_dispenser(date, report_type, comment, validation_count, dispenser_id, login_ecn)'+
        'VALUES($1,$2,$3,$4,$5,$6);'+
        'UPDATE users SET report_count = report_count + 1 WHERE login_ecn = $6',
        [date, report_type, comment, 0, dispenser_id, login_ecn]
    );
}

async function upvoteDispenserReport(report_id){
  query('UPDATE report_dispenser SET validation_count = validation_count + 1 WHERE report_dispenser_id = $1',
     [report_id]
  );
}

async function downvoteDispenserReport(report_id){
  query('UPDATE report_dispenser SET validation_count = validation_count - 1 WHERE report_dispenser_id = $1',
      [report_id]
  );
}


// -------------------- RU Reports -------------------- //
// TO DO
async function addRuReport(date, report_type, comment, dispenser_id, login_ecn){
  query('INSERT INTO report_dispenser(date, report_type, comment, validation_count, login_ecn)'+
      'VALUES($1,$2,$3,$4,$5,$6);'+
      'UPDATE users SET report_count = report_count + 1 WHERE user_id = $6',
      [date, report_type, comment, 0, dispenser_id, login_ecn]
  );
}

async function upvoteRU(report_id){
  query(
      'UPDATE report_ru SET validation_count = validation_count + 1 WHERE report_ru_id = $1',
      [report_id]
  );
}

async function downvoteRU(report_id){
  query(
      'UPDATE report_ru SET validation_count = validation_count - 1 WHERE report_ru_id = $1',
      [report_id]
  );
}


// -------------------- Issues Handling -------------------- //
async function addIssue(message,login_ecn){
  query(
      'INSERT INTO issues(message, login_ecn) VALUES($1,$2)',
      [message,login_ecn]
  );
}


// -------------------- Exported Functions -------------------- //
module.exports = {
  testAndAddEcnUser,
  getDispensers
}