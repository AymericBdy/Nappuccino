var express = require('express')
//Axios permet les requètes sur des serveurs externes
var axios = require('axios')
const bdd = require('../model/bdd');

exports.list_machines = async (req, res) => {
    bdd.getCafetMachines();
    res.status(200).send({
        machines: [
            {
                id: 1,
                name: 'Machine à café sas',
                reports: [{
                    type: 3,
                    votes: 4,
                },
                {
                    type: 4,
                    votes: 2,
                }]
            }
        ]
    })
}

exports.infos_machine = async (req, res) => {
    res.status(200).send({
	    machine_id: req.params.machine_id,
        name: 'Machine à café sas',
        reports: [{
            type: 3,
            name: "Plus de gobelets",
            details: "Test affichage détails",
            votes: 4,
        },
        {
            type: 4,
            name: "Plus de thé",
            details: "Test affichage détails",
            votes: 2,
        }]
    })
}

exports.vote_report = async (req, res) => {
    this.infos_machine(req, res);
}

exports.new_report = async (req, res) => {
    this.infos_machine(req, res);
}