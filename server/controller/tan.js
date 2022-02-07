var express = require('express')
//Axios permet les requètes sur des serveurs externes
var axios = require('axios')

exports.timetable = async (req, res) => {
    //Tan api : get ecn station time table
    const direction = req.params.direction;
    console.log("Direction: "+direction);
    const url = "https://open.tan.fr/ewp/horairesarret.json/ECSU/2/"+direction;

    const getData = async (url) => {
        try {
            const response = await axios.get(url)
            const data = response.data
            //console.log('Got tan data ',data)
            return data
        } catch (error) {
            console.log('Erreur en contactant l\'api tan', error)
            return "Error"
        }
    }

    getData(url).then(data => {
        //console.log("Le vrai return ",data)
        res.status(200).send(data)
    }).catch(error => {
      res.status(503).send("Erreur en contactant l\'api tan")
    })
}