var jwt = require('jsonwebtoken');
var atob = require('atob');
var Cryptr = require('cryptr'); //Y'en a vraiment besoin ?
var ldap = require('ldapjs');
cryptr = new Cryptr('myTotalySecretKey');

exports.validatetoken = function(req, res, next) {
    if(req.headers.authorization) {
        const token = req.header('Authorization').replace('Bearer ', '')
        const jwt = require('jsonwebtoken')
        try{
            const payload = jwt.verify(token, 'TOPSECRETTTTT'); //TODO UTILISER DOTENV process.env.JWT_SECRET
            console.log("You are in");
            console.log(payload._id);
            next(); //Continue with the request processing
        } catch(error) {
            //console.error(error.message);
            res.status(400).send("Invalid authentication token: "+error.message);
        }
    } else {
        res.status(400).send("You are not connected");
    }
}

exports.signin = function(req , res) {
    
    console.log("[INFO] Signin request received. Body is ",req.body);

    var ecnUser=req.body.id;
    var ecnPwd= req.body.password;
    var dec_pass =atob(ecnPwd);
    var encrypted_pass = cryptr.encrypt(dec_pass);
   
    // Testing ECN LDAP connection
    var isGoodAuth = authLdap(ecnUser, ecnPwd);

    if(isGoodAuth){
        
        var data = {user: ecnUser};
        console.log("[INFO] Generating token with data : " + data);
        
        var secret = 'TOPSECRETTTTT'; //TODO UTILISER process.env.JWT_SECRET
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
            
        
        jwt.sign(payload, secret, { algorithm: 'HS256', expiresIn : expiresIn}, function(err, token) {
                
            if(err){
                console.log('[ERROR] Error occurred while generating token');
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
                        "data" : data
                    });
                res.end();
            }
            else{
                res.send("[ERROR] Could not create token");
                res.end();
            }
            
            }
        });
    
    }
    else {
        res.status(400).send("[ERROR] Invalid user");
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
        console.log('[INFO] Connection of user via ENC LDAP : '+ecnUser+ ' ...');
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