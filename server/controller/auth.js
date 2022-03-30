var jwt = require('jsonwebtoken');
var ldap = require('ldapjs');
const jwtSecretKey = 'obrhHyrKo!FDefEHIPk';
const bdd = require('../model/bdd');
const logger = require('../utils/logger.js');

exports.validatetoken = function(req, res, next) {
    if(req.headers.authorization) {
        const token = req.header('Authorization').replace('Bearer ', '')
        const jwt = require('jsonwebtoken')
        try{
            const payload = jwt.verify(token, jwtSecretKey);
            req.user = payload.user;
        } catch(error) {
            logger.logError("Error auth with "+token+" : ",error);
            req.auth_error = "Invalid authentication token";
        }
    } else {
        req.auth_error = "Not authenticated";
    }
    next();
}

exports.signin = function(req , res) {
    
    var ecnUser = req.body.id;
    logger.logInfo(`Signin request received. User is ${ecnUser}.`,req.ip);
    var ecnPwd = req.body.password;
   
    // Testing ECN LDAP connection
    authLdap(ecnUser, ecnPwd, (validCredentials) => {
        if(validCredentials){
            var data = {user: ecnUser};//to do : add the priviledge into the token's data
            logger.logInfo("Generating token with data : " + JSON.stringify(data));
            
            bdd.testAndAddEcnUser(ecnUser);

            var now = Math.floor(Date.now() / 1000),
                expiresIn = 3600 * 24 * 7; //one week
                //TODO AUTOMATIC TOKEN REFRESH
                
            jwt.sign(data, jwtSecretKey, { algorithm: 'HS256', expiresIn : expiresIn}, function(err, token) {
                res.header();
                if(err){
                    logger.logError('An error occurred while generating token');
                    logger.logError(err);
                    res.status(500);
                    res.json({
                        authenticated: false,
                        message: "[ERROR] An error occurred while generating token",
                        error: err
                    });
                }
                else{
                    if(token != false){
                        res.status(200);
                        res.json({
                            authenticated: true,
                            token: token,
                            data: data
                        });
                    }
                    else{
                        res.status(500);
                        res.json({
                            authenticated: false,
                            message: "[ERROR] Could not create token"
                        });
                    }
                }
                res.end();
            });
        }
        else {
            res.status(401).send({
                authenticated: false,
                message: "[ERROR] Invalid credentials"
            });
        }
    });
};

async function authLdap(ecnUser, ecnPwd, callback) {

    var ecn = ldap.createClient({
        url: 'ldaps://ldaps.nomade.ec-nantes.fr:636/'
    });
    
    var baseDn = "ou=people,dc=ec-nantes,dc=fr";
    
    var connected = false;

    ecn.on('error', (err) => {
        logger.logFatal("Can't connect to ECN LDAP server.");
    });
    
    ecn.bind('uid='+ecnUser+','+baseDn, ecnPwd, (err) => {
        logger.logInfo('Connection of user via ENC LDAP : '+ecnUser+ ' ...');
        if(err) {
            logger.logWarn("Fail.");
            console.log(err);
        } else {
            connected = true;
            logger.logInfo("Success.");
        }
        ecn.unbind();
        callback(connected);
    });
}