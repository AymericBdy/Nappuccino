var express = require('express')
var axios = require('axios')
const logger = require('../utils/logger.js');

exports.menu = async (req, res) => {
    const url = "https://www.crous-nantes.fr/restaurant/resto-u-le-tertre/"

    const getData = async (url) => {
        try {
            const response = await axios.get(url)
            const data = response.data
            //logger.logInfo('Got ru data ',data)
            return data
        } catch (error) {
            logger.logError('Erreur en accédant au site du ru', error)
            return "Error"
        }
    }

    getData(url).then(data => {
        //logger.logInfo("Le vrai return ",data)
        res.status(200).send(data)
    }).catch(error => {
      res.status(503).send("Erreur en accédant au site du ru")
    })
}