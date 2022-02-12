var jwt = require('jsonwebtoken');
var atob = require('atob');
var ldap = require('ldapjs');
const jwtSecretKey = 'obrhHyrKo!FDefEHIPk';

exports.validatetoken = function(req, res, next) {
    if(req.headers.authorization) {
        const token = req.header('Authorization').replace('Bearer ', '')
        const jwt = require('jsonwebtoken')
        try{
            const payload = jwt.verify(token, jwtSecretKey);
            console.log("You are in");
            console.log(payload.data);
            console.log(payload.audience);
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
    console.log(req);
    console.log("Body is ",req.body);
    var name=req.body.email;
    var pass= req.body.password;
    var dec_pass =atob(pass);
   
    var isGoodAuth = true;

    if(isGoodAuth){
        
        var results = {user: "abourdy2020", mail: name}
        console.log(results);
        
        var data = results;
        
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
                
            if(err){
                console.log('Error occurred while generating token');
                console.log(err);
                return false;
            }
            else{
            if(token != false){
                //res.send(token);
                res.header();
                res.json({
                        "results":
                                {"status": "true"},
                        "token" : token,
                    "data" : results
                                    
                    });
                res.end();
            }
            else{
                res.send("Could not create token");
                res.end();
            }
            
            }
        });
    
    }
    else if(results == ""){
        req.status(400).send("Invalid user");
    }
};

function authLdap(ecnUser, ecnPwd) {

    var ecn = ldap.createClient({
        url: 'ldaps://ldaps.nomade.ec-nantes.fr:636/'
    });
    
    var baseDn = "ou=people,dc=ec-nantes,dc=fr";
    
    var connected = false;

    ecn.on('error', (err) => {
        console.log("[FATAL] Can't connect to ECN LDAP server.");
    });
    
    ecn.bind('uid='+ecnUser+','+baseDn, ecnPwd, (err) => {
        console.log('[INFO] Connection of user : '+ecnUser+ ' ...');
        if(err) {
            console.log("[INFO] Fail.");
            //console.log(err);
        } else {
            connected = true;
            console.log("[INFO] Success.");
        }
        ecn.unbind();
    });

    return connected;
}