var express = require('express')
//Axios permet les requètes sur des serveurs externes
var axios = require('axios')
const logger = require('../utils/logger.js');

exports.timetable = async (req, res) => {
    //Tan api : get ecn station time table
    const direction = req.params.direction;
    logger.logInfo("Direction: "+direction);
    const url = "https://open.tan.fr/ewp/horairesarret.json/ECSU"+direction+"/2/"+direction;

    const getData = async (url) => {
        try {
            const response = await axios.get(url)
            const data = response.data
            //logger.logInfo('Got tan data ',data)
            return data
        } catch (error) {
            logger.logError('Error while contacting TAN API.', error)
            return "Error"
        }
    }

    getData(url).then(data => {
        //logger.logInfo("Le vrai return ",data)
        res.status(200).send(data)
    }).catch(error => {
      res.status(503).send("Erreur en contactant l\'api tan")
    })
}