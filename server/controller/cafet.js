var express = require('express')
//Axios permet les requètes sur des serveurs externes
var axios = require('axios')
const bdd = require('../model/bdd');

exports.list_machines = async (req, res) => {
    const callback = () => {};//TODO to define
    bdd.getDispensers(callback);
    res.status(200).send({
        machines: [
            {
                id: 1,
                name: 'Machine à café sas',
                reports: [{
                    type: "Plus de gobelets",
                    votes: 4,
                },
                {
                    type: "Plus de thé",
                    votes: 2,
                }]
            }
        ]
    })
}

exports.infos_machine = async (req, res) => {
    //TODO GET MACHINE INFOS
    res.status(200).send({
	    machine_id: req.params.machine_id,
        name: 'Machine à café sas',
        reports: [{
            type: "Plus de gobelets",
            details: "Test affichage détails",
            votes: 4,
        },
        {
            type: "Plus de thé",
            details: "Test affichage détails",
            votes: 2,
        }],

    })
}

exports.vote_report = async (req, res) => {
    //TODO DO VOTE

    this.infos_machine(req, res);
}

exports.new_report = async (req, res) => {
    //TODO ADD IN THE BDD

    req.status(200).send({
        result: "success"
    });
}

exports.report_list = async (req, res) => {
    //TODO GET FROM THE BDD

    if(req.params.type === 'cafe') {
        res.status(200).send({
            items: ["Paiement sans contact impossible", "Pas de gobelets", "Pas de sucre", "Expresso", "Expresso allongé", 
            "Expresso crème", "Expresso crème allongé", "Ristretto", "Café soluble décaféiné", "Café soluble au lait", 
            "Cappuccino", "Cappuccino noisette", "Cappuccino à la française", "Latte", "Boisson au cacao", "Viennois au cacao",
            "Viennois praliné", "Thé vert menthe", "Thé Earl Grey", "Thé Earl Grey au lait", "Potage"]
        });
    } else if(req.params.type === 'distrib') {
        res.status(200).send({
            items: ["On veut de la bouffe", "Où est la bouffe", "La bouffe ?"]
        });
    } else {
        res.status(400).send({
            items: ["Mauvais type de machine", req.params.type]
        });
    }
}