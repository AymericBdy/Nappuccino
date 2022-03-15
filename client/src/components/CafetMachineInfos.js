import React, { Component } from 'react';
import { View, StyleSheet, UIManager, LayoutAnimation, Platform } from 'react-native';
import { Text } from 'react-native-paper'
import Background from './Background';
import { theme } from '../core/theme'
import { fetchBackend } from '../helpers/Backend';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

class CafetMachineInfos extends Component {
    state = {
        id: -1,
        name: 'Chargement',
        reports:  [{
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
            upvotes: 2,
            downvotes: 2,
            user_vote: 1,
            date: 1647031669,
            reliability: 40,
        },
        {
            type: "Plus de tfhé",
            comment: "Test affichage détfails",
            upvotes: 2,
            downvotes: 1,
            user_vote: -1,
            date: 1646945255,
            reliability: 58,
        },
        {
            type: "Plus dez thé",
            comment: "Bébou est beau sdfosdfojisfojis zriqjuzer pqsfjpz qhjzfqhupiu fsunfzefze fsunfzefzefz fsunfzefzezf  ze fz ef z ef zef ze erg retgregrethrthredyzeqifzeq ifuhozjefeçzijok fzq fuinj",
            upvotes: 6,
            downvotes: 0,
            user_vote: 1,
            date: 1646858855,
            reliability: 100,
        },
        {
            type: "Plusa de thé",
            comment: "Test affichage déztails",
            upvotes: 2,
            downvotes: 4,
            user_vote: 0,
            date: 1644439655,
            reliability: 40,
        }],
        shown_report: null,
    }

    constructor(props) {
        super(props);
    
        this.state = {
          ...this.state,
          id: props.machine_id,
          type_machine: props.type_machine,
        };

        if (Platform.OS === 'android') {
            if (UIManager.setLayoutAnimationEnabledExperimental) {
              UIManager.setLayoutAnimationEnabledExperimental(true);
            }
          }
    }

    getMachineInfos() {
        const id = this.state.id;
        var searchUrl = "cafet/machine/reports/"+id;
        //"https://open.tan.fr/ewp/horairesarret.json/ECSU/2/"+direction;
        //pb : localhost marche pas parce que c'est le localhost de l'émulateur android
        console.log('Getting machines for '+searchUrl);
        fetchBackend(searchUrl).then(res => res.json()
        ).then(responseJson => {
            this.setState({
                ...this.state,
                ...responseJson,
                shown_report: null,
            })
        }).catch(error => {
            console.log("Erreur pour récupérer les infos de la machine "+id, error);
            this.setState(
            {
                ...this.state,
                name: "Erreur",
                reports:  [{
                    type: "Erreur de chargement",
                    comment: "Erreur de chargement des signalements, réessayez plus tard. \n Erreur: "+error.message,
                    upvotes: 0,
                    downvotes: 0,
                    user_vote: 0,
                    date: new Date().getTime()/1000,
                    reliability: "-",
                }],
                shown_report: null,
            })
        });
    }

    formatDate(timestamp) {
        const now = new Date();
        //On ajoute une heure pcq wtf ça marche
        const date = new Date(timestamp*1000 + 3600 * 1000);
        if(now.getDay() == date.getDay()) {
            return date.getHours()+"h"+date.getMinutes();
        } else if(now.getTime() - date.getTime() < (24 * 3600 * 1000)) {
            return "Hier";
        } else {
            return date.getDay()+"/"+date.getMonth()+"/"+date.getFullYear();
        }
    }

    render() {
        const styles = StyleSheet.create({
            report_item: {
                textAlign: 'center',
                marginBottom: 12,
                padding: 0,
                paddingBottom: 60,
                borderWidth: 2,
                borderColor: 0,
                backgroundColor: '#123764',
                borderRadius: 20,
                width: 340,
                height: 'auto',
            },
            report_header: {
                backgroundColor: '#F0AC00',
                width: 337,
                height: 30,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                padding: 5,
                paddingLeft: 10,
            },
            report_title: {
                color: theme.colors.surface,
                fontSize: 18,
                lineHeight: 20,
            },
            report_time: {
                position: 'absolute',                                          
                right: 15,
                top: 5,
                color: theme.colors.surface,
            },
            text: {
                padding: 10,
                paddingTop: 5,
            },
            vote_view: {
                position: 'absolute',                                          
                bottom: 12,
                left: 15,
                width: 100,
                height: 20,
                flex: 1,
            },
            vote_text: {
                color: '#B0B8BF',
                fontSize: 18,
                lineHeight: 20,
            },
            button_view: {
                position: 'absolute',                                          
                bottom: 8,
                flex: 1,
            },
            vote_button: {
                width: 60,
                height: 60,
                borderRadius: 80, 
                backgroundColor: '#F0AC00',
                justifyContent: 'center',
                alignItems:'center',
            },
            vote_button_disabled: {
                backgroundColor: '#846E24',
            },
            vote_button_text: {
                color: theme.colors.surface
            }
        })
        // console.log('render menu ru')
        // console.log(this.state)

       // console.log(this.props);
        //console.log(this.state);

        const bigger_report = (report) => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            this.setState({
                ...this.state,
                shown_report: report.type === this.state.shown_report ? null : report.type,
            });
        }
        const click_up = (report) => {
            if(report.user_vote != 1) {
                if(report.user_vote == -1) {
                    report.downvotes = report.downvotes - 1;
                    report.user_vote = 0;
                } else {
                    report.upvotes = report.upvotes + 1;
                    report.user_vote = 1;
                }
                //TODO REQUEST TO SERVER
                this.setState(this.state);
            }
        }
        const click_down = (report) => {
            if(report.user_vote != -1) {
                if(report.user_vote == 1) {
                    report.upvotes = report.upvotes - 1;
                    report.user_vote = 0;
                } else {
                    report.downvotes = report.downvotes + 1;
                    report.user_vote = -1;
                }
                //TODO REQUEST TO SERVER
                this.setState(this.state);
            }
        }

        return <Background>
            <Text style={{fontSize: 20}}>{this.state.name} {"\n"}</Text>

            <ScrollView>
                {this.state.reports.map((report) => {
                    return <TouchableOpacity key={report.type} activeOpacity={0.8} onPress={() => bigger_report(report)}>
                        <View style={styles.report_item}>
                            <View style={styles.report_header}>
                                <Text style={styles.report_title}>{report.type}</Text>
                                <Text style={styles.report_time}>{this.formatDate(report.date)}</Text>
                            </View>

                            <Text style={styles.text}>Fiabilité {report.reliability}/100</Text>

                            {
                                report.type === this.state.shown_report ? 
                                <View style={styles.text}>
                                    <Text>{report.comment}</Text>
                                </View>
                                :
                                <></>
                            }

                            <View style={styles.vote_view}>
                                <Text style={styles.vote_text}>{report.upvotes-report.downvotes} votes</Text>
                            </View>

                            <View style={{
                             ...styles.button_view,
                             right: 15,
                            }}>
                                <TouchableOpacity activeOpacity={0.4} onPress={() => click_up(report)} 
                                    style={report.user_vote == 1 ? 
                                    {...styles.vote_button, ...styles.vote_button_disabled} : styles.vote_button}>
                                    <Text style={styles.vote_button_text}>+ 1</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{
                             ...styles.button_view,
                             right: 90,
                            }}>
                                <TouchableOpacity activeOpacity={0.4} onPress={() => click_down(report)} 
                                    style={report.user_vote == -1 ? 
                                    {...styles.vote_button, ...styles.vote_button_disabled} : styles.vote_button}>
                                    <Text style={styles.vote_button_text}>- 1</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                })}
            </ScrollView>
        </Background>
    }

    componentDidMount() {
        this.getMachineInfos();
    }
}
export default CafetMachineInfos;