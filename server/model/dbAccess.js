const { Pool, Client } = require('pg')
const fs = require('fs')


function addUser(){
    const query = {
      text: 'INSERT INTO users(report_count, status) VALUES($1, $2)',
      values: ['0', ''],
    }
    return query
}
  
function addEcnUser(user_id, login_ecn){
    const query = {
      text: 'INSERT INTO user_ecn(login_ecn, user_id) VALUES($1, $2)',
      values: [login_ecn, user_id],
    }
    return query
}

function addDispenserReport(user_id, user_ecn, date, report_type, comment, dispenser_id){
      const query = {
          text: 'INSERT INTO report_dispenser(date, report_type, comment, validation_count, dispenser_id, login_ecn)'+
          'VALUES($1,$2,$3,$4,$5,$6);'+
          'UPDATE users SET report_count = report_count + 1 WHERE user_id = $7',
          values: [date, report_type, comment, 0, dispenser_id, user_ecn, user_id],
      }
      return query
}

// TO DO
function addRuReport(user_id, user_ecn, date, report_type, comment, dispenser_id){
    const query = {
        text: 'INSERT INTO report_dispenser(date, report_type, comment, validation_count, dispenser_id, login_ecn)'+
        'VALUES($1,$2,$3,$4,$5,$6);'+
        'UPDATE users SET report_count = report_count + 1 WHERE user_id = $7',
        values: [date, report_type, comment, 0, dispenser_id, user_ecn, user_id],
    }
    return query
}

