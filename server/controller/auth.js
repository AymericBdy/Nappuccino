var jwt = require('jsonwebtoken');
var atob = require('atob');
var Cryptr = require('cryptr'), //Y'en a vraiment besoin ?
var ldap = require('ldapjs')
cryptr = new Cryptr('myTotalySecretKey');

exports.validatetoken = function(req, res, next) {
    if(req.headers.authorization) {
        const token = req.header('Authorization').replace('Bearer ', '')
        const jwt = require('jsonwebtoken')
        try{
            const payload = jwt.verify(token, 'TOPSECRETTTTT'); //TODO UTILISER DOTENV process.env.JWT_SECRET
            console.log("You are in");
            console.log(payload._id);
            next();
        } catch(error) {
            console.error(error.message);
            res.status(400).send("You are not in");
        }
    } else {
        res.status(400).send("Tu n'es pas connecté, pas beau");
    }
}

exports.signin = function(req , res) {
    console.log("Body is ",req.body);
    var name=req.body.email;
    var pass= req.body.password;
    var dec_pass =atob(pass);
   var encrypted_pass = cryptr.encrypt(dec_pass);
   
   var isGoodAuth = true;
        if(isGoodAuth){
            
            var results = {user: "abourdy2020", mail: name}
            console.log(results);
            
            var data = results;
            
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