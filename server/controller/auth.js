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
            /*console.log("You are in");
            console.log(payload.data);
            console.log(payload.audience);*/
            next(); //Continue with the request processing
        } catch(error) {
            //console.error(error.message);
            res.status(400).send({
                code: 400,
                message: "Invalid authentication token",
                error: error
            });
        }
    } else {
        res.status(400).send({
            code: 401,
            message: "Not authenticated",
        });
    }
}

exports.signin = function(req , res) {
    
    var ecnUser = req.body.id;
    logger.logInfo(`Signin request received. User is ${ecnUser}.`,req.ip);
    var ecnPwd = req.body.password;
   
    // Testing ECN LDAP connection
    authLdap(ecnUser, ecnPwd, (validCredentials) => {
        if(validCredentials){
            var data = {user: ecnUser};//to do : add the priviledge into the token's data
            logger.logInfo("Generating token with data : " + data);
            
            bdd.testAndAddEcnUser(ecnUser);

            var now = Math.floor(Date.now() / 1000),
                iat = (now - 10),
                expiresIn = 3600,
                expr = (now + expiresIn),
                notBefore = (now - 10),
                jwtId = Math.random().toString(36).substring(7);
            var payload = {
                iat: iat,
                jwtid : jwtId,
                audience : 'TEST',
                data : data
            };	
                
            jwt.sign(payload, jwtSecretKey, { algorithm: 'HS256', expiresIn : expiresIn}, function(err, token) {
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