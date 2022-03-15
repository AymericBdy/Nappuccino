const fs = require('fs');
const logs = "logs/server.log";

function log(type, text, ip, user, priviledge) {
    textLine = cut(text, 40)

    if( typeof ip !== 'undefined' ) {
        textLine[0] = textLine[0] + " IP : "+ip+" |";
    }

    if( typeof user !== 'undefined' ) {
        textLine[0] = textLine[0] + " USER : "+user+" |";
    }

    if( typeof priviledge !== 'undefined' ) {
        textLine[0] = textLine[0] + " PRIVILEDGE : "+priviledge+" |";
    }

    for(const i in textLine) {
        switch(type) {
            case 'DEBUG' :
                logAndSaveLog("\x1b[0m\x1b[1m", "[DEBUG] "+textLine[i]);
                break;
            case 'INFO' :
                logAndSaveLog("\x1b[0m\x1b[32m", "[INFO]  "+textLine[i]);
                break;
            case 'WARN' :
                llogAndSaveLogog("\x1b[0m\x1b[33m", "[WARN]  "+textLine[i]);
                break;
            case 'ERROR' :
                logAndSaveLog("\x1b[0m\x1b[31m", "[ERROR] "+textLine[i]);
                break;
            case 'FATAL' :
                logAndSaveLog("\x1b[0m\x1b[31m\x1b[1m", "[FATAL] "+textLine[i]);
                break;
            default :
                logAndSaveLog("\x1b[0m", "[UNKNOWN] "+textLine[i]);
        }
    }
}

function logDebug(text, ip, user, priviledge) {
    log('DEBUG', text, ip, user, priviledge);
}

function logInfo(text, ip, user, priviledge) {
    log('INFO', text, ip, user, priviledge);
}

function logWarn(text, ip, user, priviledge) {
    log('WARN', text, ip, user, priviledge);
}

function logError(text, ip, user, priviledge) {
    log('ERROR', text, ip, user, priviledge);
}

function logFatal(text, ip, user, priviledge) {
    log('FATAL', text, ip, user, priviledge);
}

function cut(str, len) {
    if (str.length <= len) {
        return [str+" ".repeat(len-str.length)+" |"];
    }
    var indexSpace = len;
    while(indexSpace >= 0 && str[indexSpace] != " "){
        indexSpace -- ;
    }
    return [str.substr(0, indexSpace)+" ".repeat(len-indexSpace)+" |"].concat(cut(str.substr(indexSpace+1, str.length), len));
}

function logAndSaveLog(color, str) {
    dateStr = "["+(new Date(Date.now())).toUTCString() + "] "
    str = dateStr + str ;
    console.log(color, str);
    fs.appendFile(logs, str + "\n", (err) => {
        if(err) {
            console.log("\x1b[0m\x1b[31m\x1b[1m", dateStr + "[FATAL] Error: unable to write to log file.");
            console.log("\x1b[0m\x1b[31m\x1b[1m", dateStr + "[FATAL] " + err);
        }
    });
}

module.exports = {
    logDebug,
    logInfo,
    logError,
    logWarn,
    logFatal,
}