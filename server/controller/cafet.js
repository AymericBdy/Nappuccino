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
                machines: result,
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
                        user_vote: result.filter(v => v.login_ecn === req.user).length > 0 ? 
                        (result.filter(v => v.login_ecn === req.user)[0].vote_type ? 1 : -1) : 0,
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
}

exports.vote_report = async (req, res) => {
    const report_id = req.body.report_id;
    const upvote = req.body.upvote;

    if(!req.user) {
        res.status(400).send({
            result: "Vous devez être connecté",
            error: req.auth_error,
        });
    } else {
        bdd.addVoteDispenserReport(upvote, report_id, req.user, (error) => {
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
}

exports.new_report = async (req, res) => {
    if(!req.user) {
        res.status(400).send({
            result: "Vous devez être connecté",
            error: req.auth_error,
        });
    } else {
        const machine_id = req.body.machine_id;
        const report_type = req.body.report_type;
        const comment = req.body.comment;
        const user = req.user;

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

                const itemList = ["Distributeur en panne", "Paiement sans contact impossible", "Pas de gobelets", "Pas de sucre", "Expresso", "Expresso allongé", 
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
        bdd.getDispenserInfos(req.params.machine_id, (error, result) => {
            if(error) {
                res.status(500).send({
                    result: "Erreur de base de données",
                    error: error,
                });
            } else {
                //filter the elements that are not yet reported

                const itemList = ["Distributeur en panne", "Paiement sans contact impossible", "Plus de gauffres", "Liste à compléter"];

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
    } else {
        res.status(400).send({
            items: ["Mauvais type de machine", req.params.type]
        });
    }
}

exports.getmachinestatus= async (req, res) => {
   bdd.getDispenserStatuses((error, rows) => {
    if(error) {
        res.status(500).send({
            result: "Erreur de base de données",
            error: error,
        });
        }
        else{
          res.status(200).send({
            status_all: rows
        });
    }
});
}