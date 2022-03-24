const { Pool, Client } = require('pg');
const fs = require('fs');
const logger = require('../utils/logger.js');
const { nextTick } = require('process');
const moment = require('moment');
const express = require('express');

// Connection to database
const logInfo = JSON.parse(fs.readFileSync('properties/bdd.json', 'utf8'));
const pool = new Pool(logInfo);


// -------------------- Query Handling -------------------- //
async function query(query, params, callback) {
  pool.query(query, params, (err, result) => {
    if(err) {
      logger.logFatal("Can't execute the desired query : ");
      logger.logFatal(query);
      logger.logFatal("Error is : "+err);
      // Aymeric :  makes crashing logger.logFatal("Error stack is : "+err.stack);
      callback(err, []);
    } else {
      if(typeof callback === 'function') {
        callback(null, result.rows);
      }
    }
  });
}


// -------------------- Users Handling -------------------- //
async function addEcnUser(userEcn) {
  query('INSERT INTO users(login_ecn, report_count, priviledge) VALUES($1, $2, $3)',
    [userEcn, 0, 'user'],
  (error, row) => {}); //TODO HANDLE ERRORS
}

async function doesEcnUserExist(userEcn, callback) {
  logger.logInfo(`Testing if user ${userEcn} exists in the database.`);
  query(
    'SELECT login_ecn FROM users WHERE login_ecn = $1', 
    [userEcn],
    (error, rows) => {callback(Object.keys(rows).length !== 0);} );
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

//Tested and working
async function getDispensers(callback) {
  query(
    'SELECT dispenser_id, dispenser_type, dispenser_status FROM public.dispenser;',
    [],
    (error, rows) => {
      callback(error, rows);
    });
}

async function getDispenserInfos(machineId, callback) {
  query(
    'SELECT * FROM public.report_dispenser WHERE dispenser_id=$1 AND display=TRUE ORDER BY date DESC;',
    [machineId],
    (error, rows) => {
      callback(error, rows);
    });
}

async function getDispenserStatus(machineId, callback) {
  query(
    'SELECT dispenser_status FROM public.dispenser WHERE dispenser_id=$1;',
    [machineId],
    (error, rows) => {
      callback(error, rows);
    });
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

async function getDispenserReport(machineId, report_type, callback) {
  query(
    'SELECT * FROM public.report_dispenser WHERE dispenser_id=$1 AND display=TRUE AND type=$2;',
    [machineId, report_type],
    (error, rows) => {
      logger.logInfo(rows);
      callback(error, rows);
    });
}

//Tested and working
async function addDispenserReport(date, report_type, comment, dispenser_id, login_ecn, callback){
  query('INSERT INTO report_dispenser(date, type, comment, display, reliability, dispenser_id, login_ecn)'+
        'VALUES($1,$2,$3,$4,$5,$6,$7);',
        [date, report_type, comment, 'TRUE', 50, dispenser_id, login_ecn]
    , (error, result) => {
      if(error) {
        callback(error);
      } else {
        query('UPDATE users SET report_count = report_count + 1 WHERE login_ecn = $1',
          [login_ecn],
          (error, result) => {
            if(error) {
              callback(error);
            } else {
              callback(null);
            }
          });
      }
    });
}

async function addVoteDispenserReport(vote_type, report_id, login_ecn, callback){
  console.log('PArams are ',vote_type," ",report_id," ",login_ecn);
  
  query('SELECT vote_id, vote_type FROM votes WHERE login_ecn=$1 AND report_dispenser_id=$2',
    [login_ecn, report_id], (error, result) => {
      if(error) {
        callback(error);
      } else {
        if(result.length > 0) {
          query('DELETE FROM votes WHERE login_ecn=$1 AND report_dispenser_id=$2;',
          [login_ecn, report_id], (error, result) => {
            if(error) {
              callback(error);
            } else {
              callback(null);
            }
          });
        } else {
          query('INSERT INTO votes(date, vote_type, report_dispenser_id, login_ecn) VALUES($1,$2,$3,$4)',
            ['NOW()', vote_type, report_id, login_ecn],
            (error, result) => {
              if(error) {
                callback(error);
              } else {
                callback(null);
              }
          });
        }
      }
    });
}

async function getDisplayedReports(callback){
  query(
    'SELECT * FROM public.report_dispenser WHERE display=TRUE;',
    [],
    (error, rows) => {
      //logger.logInfo(rows);
      callback(error, rows);
    });
}

async function getReportVotes(report_id, callback){
  query(
    'SELECT * FROM public.votes WHERE report_dispenser_id=$1;',
    [report_id],
    (error, rows) => {
      callback(error, rows);
    });
}

async function updateReportsDisplay(){
  query(
    'UPDATE report_dispenser SET display = FALSE WHERE reliability=0 AND display=TRUE',
    []
  );
}

async function updateReportReliability(report_id, reliability){
  query(
    'UPDATE report_dispenser SET reliability = $2 WHERE report_dispenser_id = $1',
    [report_id, reliability]
  );
}

async function updateAllDispensersStatus(){
  getDispensers((error,dispensers) => {
    if(error){
      logger.logFatal("Error at getDispensers in updateAllDispensersStatus : "+error);
    }else{

      for(let i = 0; i<dispensers.length; i+=1){
        
        const disp = dispensers[i];

        //for each dispenser, getting all active reports
        getDispenserInfos(disp['dispenser_id'], (error,reports) => {

          if(reports.length > 0){
            updateDispenserStatus('issue', disp['dispenser_id'])
          } else {
            updateDispenserStatus('ok', disp['dispenser_id'])
          }

        });
      }
    }
  });
}

async function updateReliability(){

  // constants for reliability calculation
  let alpha = 5;
  let beta = 10;
  let gamma = 5;

  let hours = 0;

  // Get all displayed reports to update
  getDisplayedReports((error,rows) => {
    if(error){
      logger.logFatal("Error at getDisplayedReports in updateReliability : "+error);
    }else{
      for(let i = 0; i<rows.length; i+=1){
      
        const report = rows[i];      

        //for each report we get the votes
        getReportVotes(report['report_dispenser_id'], (error, votes) => {
          
          let upvotes = 0;
          let downvotes = 0;

          if(error){
            logger.logFatal("Error at getReportVotes in updateReliability : "+error);
          }else{

            for(let j =0; j<votes.length; j+=1){
              if(votes[j]['vote_type']){
                upvotes+=1;
              }else{
                downvotes+=1;
              }
            }
            // Obtaining number of hours since the creation of the report
            let start_date = moment(report['date'], 'YYYY-MM-DD HH:mm:ss');
            let end_date = moment(new Date(), 'YYYY-MM-DD HH:mm:ss');

            
            let duration = moment.duration(end_date.diff(start_date));
            hours = duration.asDays()*24; 

            // Computing reliability
            let reliability = Math.min(100, Math.max(0, 50 + alpha*upvotes - beta*downvotes - gamma*hours));
            // Update reliability of the report being treated

            updateReportReliability(report['report_dispenser_id'], Math.floor(reliability));
          }
        });


      }
    }
  });
  // Update the display attributes of reports to not display unreliable report
  updateReportsDisplay();
  updateAllDispensersStatus();
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
  getDispensers,
  updateReliability,
  addDispenserReport,
  getDispenserInfos,
  getReportVotes,
  getDispenserStatus,
  getDispenserReport,
  addVoteDispenserReport,
}