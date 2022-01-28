var express = require('express')
var axios = require('axios')

exports.menu = async (req, res) => {
    const url = "https://www.crous-nantes.fr/restaurant/resto-u-le-tertre/"

    const getData = async (url) => {
        try {
            const response = await axios.get(url)
            const data = response.data
            //console.log('Got ru data ',data)
            return data
        } catch (error) {
            console.log('Erreur en accédant au site du ru', error)
            return "Error"
        }
    }

    getData(url).then(data => {
        //console.log("Le vrai return ",data)
        res.status(200).send(data)
    }).catch(error => {
      res.status(503).send("Erreur en accédant au site du ru")
    })
}