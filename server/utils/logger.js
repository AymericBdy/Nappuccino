function log(type, text, ip) {
    if( typeof ip !== 'undefined' ) {
        text = text + "\tIP : "+ip
    }
    switch(type) {
        case 'INFO' :
            console.log("[INFO]\t"+text);
            break;
        case 'WARN' :
            console.log("[WARN]\t"+text);
            break;
        case 'ERROR' :
            console.log("[ERROR]\t"+text);
            break;
        case 'FATAL' :
            console.log("[FATAL]\t"+text);
            break;
        default :
            console.log("[UNKNOWN]\t"+text);
    }
}

function logInfo(text, ip) {
    log('INFO', text, ip);
}

function logWarn(text, ip) {
    log('WARN', text, ip);
}

function logError(text, ip) {
    log('ERROR', text, ip);
}

function logFatal(text, ip) {
    log('FATAL', text, ip);
}

module.exports = {
    logInfo,
    logError,
    logWarn,
    logFatal
}