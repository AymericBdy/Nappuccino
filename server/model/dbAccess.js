const { Pool, Client } = require('pg')
const fs = require('fs')


function addUser(){
    const query = {
      text: 'INSERT INTO users(login_ecn, report_count, status) VALUES($1, $2, $3)',
      values: [userEcn, 0, 'user']
    }
    return query
}
  
exports.addEcnUser = function addEcnUser(user_id, login_ecn){
    const query = {
      text: 'INSERT INTO users(login_ecn, report_count, status) VALUES($1, $2, $3)',
      values: [userEcn, 0, 'user'],
    }
    return query
}

function addDispenserReport(date, report_type, comment, dispenser_id, login_ecn){
      const query = {
          text: 'INSERT INTO report_dispenser(date, report_type, comment, validation_count, dispenser_id, login_ecn)'+
          'VALUES($1,$2,$3,$4,$5,$6);'+
          'UPDATE users SET report_count = report_count + 1 WHERE login_ecn = $6',
          values: [date, report_type, comment, 0, dispenser_id, login_ecn],
      }
      return query
}

// TO DO
function addRuReport(date, report_type, comment, dispenser_id, login_ecn){
    const query = {
        text: 'INSERT INTO report_dispenser(date, report_type, comment, validation_count, login_ecn)'+
        'VALUES($1,$2,$3,$4,$5,$6);'+
        'UPDATE users SET report_count = report_count + 1 WHERE user_id = $6',
        values: [date, report_type, comment, 0, dispenser_id, login_ecn],
    }
    return query
}


function addDispenser(dispenser_type){
    const query ={ 
        text: 'INSERT INTO dispenser(dispenser_type, dispenser_status) VALUES($1,$2)',
        values: [dispenser_type, 'fonctionnel']
    }
    return query
}

function addIssue(message,login_ecn){
    const query ={
        text: 'INSERT INTO issues(message, login_ecn) VALUES($1,$2)',
        values: [message,login_ecn]
    }
    return query
}

function upvoteRU(report_id){
    const query ={
        text: 'UPDATE report_ru SET validation_count = validation_count + 1 WHERE report_ru_id = $1',
        values: [report_id]
    }
    return query
}

function upvoteDispenser(report_id){
    const query ={
        text: 'UPDATE report_dispenser SET validation_count = validation_count + 1 WHERE report_dispenser_id = $1',
        values: [report_id]
    }
    return query
}

function downvoteRU(report_id){
    const query ={
        text: 'UPDATE report_ru SET validation_count = validation_count - 1 WHERE report_ru_id = $1',
        values: [report_id]
    }
    return query
}

function downvoteDispenser(report_id){
    const query ={
        text: 'UPDATE report_dispenser SET validation_count = validation_count - 1 WHERE report_dispenser_id = $1',
        values: [report_id]
    }
    return query
}


function updateDispenserStatus(status,dispenser_id){
    const query ={
        text: 'UPDATE dispenser SET dispenser_status = $1 WHERE dispenser_id = $2',
        values: [status, dispenser_id]
    }
    return query
}