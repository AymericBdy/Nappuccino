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
    console.log("get infos for machine ",req.params.machine_id);
    const prom = new Promise((resolve, reject) => {
        bdd.getDispenserInfos(req.params.machine_id, (error, result) => {
            if(error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
    prom.then(result => {
        var promiseArray = [];
    
        result.map((value, index) => {
            promiseArray.push(new Promise((resolve, reject) => {
                bdd.getReportVotes(value.report_dispenser_id, (error, result) => {
                    console.log("Result of "+index+" is ",result);
                    if (error) reject(error);
                    else resolve({
                        id: value.report_dispenser_id,
                        type: value.type,
                        comment: value.comment,
                        date: value.date,
                        reliability: value.reliability,
                        upvotes: result.filter(v => v.vote_type).length,
                        downvotes: result.filter(v => !v.vote_type).length,
                        //TODO USE THE CONNECTED USER IF THERE IS ONE
                        user_vote: result.filter(v => v.login_ecn === 'abourdy2020').length > 0 ? 
                        (result.filter(v => v.login_ecn === 'abourdy2020')[0].vote_type ? 1 : -1) : 0,
                    });
                });
            }));
        });
        Promise.all(promiseArray).then(result => {
            console.log("Final result is ",result);
            res.status(200).send({
                machines: result
            });
        }).catch(error => {
            res.status(500).send({
                result: "Erreur de base de données (step 2)",
                error: error,
            });
        });
    }).catch(error => {
        res.status(500).send({
            result: "Erreur de base de données (step 1)",
            error: error,
        });
    });
    /*bdd.getReportVotes(req.params.machine_id, (error, result) => {
        if(error) {
            res.status(500).send({
                result: "Erreur de base de données (step 1)",
                error: error,
            });
        } else {

            res.status(200).send({
                machines: result
            });
        }
    });*/
    /*res.status(200).send({
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
    })*/
}

exports.vote_report = async (req, res) => {
    const report_id = req.body.report_id;
    const upvote = req.body.upvote;

    //TODO GET FROM AUTH TOKEN !!!
    bdd.addVoteDispenserReport(upvote, report_id, 'nap_test_user', (error) => {
        if(error) {
            res.status(500).send({
                result: "Impossible d'ajouter le vote",
                error: error,
            });
        } else {
            req.params.machine_id = req.body.machine_id;
            this.infos_machine(req, res);
        }
    });
}

exports.new_report = async (req, res) => {
    //TODO ADD IN THE BDD

    const machine_id = req.body.machine_id;
    const report_type = req.body.report_type;
    const comment = req.body.comment;
    const user = 'nap_test_user'; //TODO GET FROM AUTH TOKEN !!!

    console.log("putting "+machine_id+" "+report_type+" "+comment);

    bdd.getDispenserReport(machine_id, report_type, (error, result) => {
        if(error) {
            res.status(500).send({
                result: "Erreur de base de données (1)",
                error: error,
            });
        } else {
            console.log("Result is ",result);
            console.log("Result ?",(result.length === 0));
            if(result.length === 0) {
                bdd.addDispenserReport("NOW()", report_type, comment, machine_id, user,
                (error) => {
                    if(error) {
                        res.status(500).send({
                            result: "Erreur de base de données (2)",
                            error: error,
                        });
                    } else {
                        res.status(200).send({
                            result: "success"
                        });
                    }
                });
            } else {
                res.status(200).send({
                    result: "duplicated"
                });
            }
        }
    });
}
exports.report_list_old = async (req, res) => {
    res.status(200).send({
        items: ["Mettez à jour l'application"]
    });
}

exports.report_list = async (req, res) => {
    //TODO GET FROM THE BDD

    if(req.params.type === 'cafe') {
        bdd.getDispenserInfos(req.params.machine_id, (error, result) => {
            if(error) {
                res.status(500).send({
                    result: "Erreur de base de données",
                    error: error,
                });
            } else {
                //filter the elements that are not yet reported

                const itemList = ["Paiement sans contact impossible", "Pas de gobelets", "Pas de sucre", "Expresso", "Expresso allongé", 
                "Expresso crème", "Expresso crème allongé", "Ristretto", "Café soluble décaféiné", "Café soluble au lait", 
                "Cappuccino", "Cappuccino noisette", "Cappuccino à la française", "Latte", "Boisson au cacao", "Viennois au cacao",
                "Viennois praliné", "Thé vert menthe", "Thé Earl Grey", "Thé Earl Grey au lait", "Potage"];

                //console.log("Building from ",result);

                const availableItems = [];
                itemList.map((value, index) => {
                    if(!(!!result.find(report => {
                        return report.type === value;
                    }))) {
                        availableItems.push(value);
                    }
                });

                //console.log("Built item list ",availableItems);

                res.status(200).send({
                    items: availableItems
                });
            }
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