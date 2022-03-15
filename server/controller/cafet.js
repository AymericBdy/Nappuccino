var express = require('express')
//Axios permet les requètes sur des serveurs externes
var axios = require('axios')
const bdd = require('../model/bdd');
const { report } = require('../routes/ru.route');

exports.list_machines = async (req, res) => {
    bdd.getDispensers((error, result) => {
        if(error) {
            res.status(500).send({
                result: "Erreur de base de données",
                error: error,
            });
        } else {
            res.status(200).send({
                machines: result
            });
        }
    });
}

exports.infos_machine = async (req, res) => {
    //TODO GET MACHINE INFOS
    res.status(200).send({
	    machine_id: req.params.machine_id,
        name: 'Machine à café sas',
        reports: [{
            type: "Plus de gobelets",
            comment: "Test affichage détails",
            upvotes: 4,
            downvotes: 1,
            user_vote: 0,
            date: 1647013789,
            reliability: 70,
        },
        {
            type: "Plus de thé",
            comment: "Test affichage détails",
            votes: 2,
            downvotes: 0,
            user_vote: 1,
            date: 1647013789,
            reliability: 40,
        }],

    })
}

exports.vote_report = async (req, res) => {
    //TODO DO VOTE

    this.infos_machine(req, res);
}

exports.new_report = async (req, res) => {
    //TODO ADD IN THE BDD

    const machine_id = req.body.machine_id;
    const report_type = req.body.report_type;
    const comment = req.body.comment;
    const user = 'nap_test_user'; //TODO GET FROM AUTH TOKEN !!!

    console.log("putting "+machine_id+" "+report_type+" "+comment);

    await bdd.addDispenserReport("NOW()", report_type, comment, machine_id, user,
        (error) => {
            if(error) {
            res.status(500).send({
                result: "Erreur de base de données",
                error: error,
            });
            } else {
            res.status(200).send({
                result: "success"
            });
            }
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