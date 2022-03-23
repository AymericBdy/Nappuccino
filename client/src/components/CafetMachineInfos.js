import React, { Component } from 'react';
import { View, StyleSheet, UIManager, LayoutAnimation, Platform } from 'react-native';
import { Text , FAB} from 'react-native-paper'
import Background from './Background';
import { theme } from '../core/theme'
import { fetchBackend } from '../helpers/Backend';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {
  ToastAndroid,
} from "react-native";

class CafetMachineInfos extends Component {
    state = {
        id: -1,
        name: 'Chargement',
        reports: [],
        shown_report: null,
    }

    constructor(props) {
        super(props);
    
        this.state = {
          ...this.state,
          id: props.machine_id,
          type_machine: props.type_machine,
          navigation: props.navigation,
          auth: props.auth,
        };

        if (Platform.OS === 'android') {
            if (UIManager.setLayoutAnimationEnabledExperimental) {
              UIManager.setLayoutAnimationEnabledExperimental(true);
            }
          }
    }

    getMachineInfos() {
        const auth = this.state.auth;
        const id = this.state.id;
        var searchUrl = "cafet/machine/reports/"+id;
        //"https://open.tan.fr/ewp/horairesarret.json/ECSU/2/"+direction;
        //pb : localhost marche pas parce que c'est le localhost de l'émulateur android
        console.log('Getting machines for '+searchUrl);
        fetchBackend(searchUrl, null, auth).then(res => res.json()
        ).then(responseJson => {
            console.log("Res is ",responseJson);
            this.setState({
                ...this.state,
                name: this.state.type_machine === 'cafe' ? 'Machine à café ' + this.state.id : "Distributeur " + this.state.id,
                reports: responseJson.machines,
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

    sendVote(reportType, voteUp) {
        const auth = this.state.auth;
        if(auth.authState.accessToken == null) {
            ToastAndroid.showWithGravity(
              "Vous devez être connecté",
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM
            );
        } else {
            const id = this.state.id;
            var searchUrl = "/machine/vote";
            //"https://open.tan.fr/ewp/horairesarret.json/ECSU/2/"+direction;
            //pb : localhost marche pas parce que c'est le localhost de l'émulateur android
            console.log('Sending vote on '+searchUrl);
            fetchBackend(searchUrl, {
                method: 'post',
                body: {
                  machine_id: id,
                  report_type: reportType,
                  upvote: voteUp,
                }
              }, auth).then(res => res.json()
            ).then(responseJson => {
                console.log("Res is ",responseJson);
                this.setState({
                    ...this.state,
                    reports: responseJson.machines,
                })
            }).catch(error => {
                console.log("Erreur pour envoyer un vote et récupérer les infos de la machine "+id, error);
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
    }

    formatDate(timestamp) {
        const now = new Date();
        //On ajoute une heure pcq wtf ça marche
        const date = new Date(Date.parse(timestamp)); //new Date(timestamp*1000 + 3600 * 1000);
        if(now.getDay() == date.getDay()) {
            return date.getHours()+"h"+date.getMinutes();
        } else if(now.getTime() - date.getTime() < (24 * 3600 * 1000)) {
            return "Hier";
        } else {
            return date.getDay()+"/"+date.getMonth()+"/"+date.getFullYear();
        }
    }

    handleFABClick() {
        const auth = this.state.auth;

        const goBack = () => this.getMachineInfos();

        if(auth.authState.accessToken == null) {
            ToastAndroid.showWithGravity(
              "Vous devez être connecté",
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM
            );
          } else {
            if(this.state.type_machine == "cafe")
            this.state.navigation.navigate("CafetNewReportMachCaf", {id: this.state.id, type: this.state.type_machine, infos_view: {goBack}})
            else if(this.state.type_machine == "distrib")
            this.state.navigation.navigate("CafetNewReportDistrib", {id: this.state.id, type: this.state.type_machine, infos_view:  {goBack}})
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
                /*height: 30,*/
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                padding: 5,
                paddingLeft: 10,
                height: 'auto',
            },
            report_title: {
                color: theme.colors.surface,
                fontSize: 18,
                lineHeight: 20,
                width: 270,
                height: 'auto',
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
                fontWeight: 'bold',
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
            if(this.state.auth.authState.accessToken == null) {
                ToastAndroid.showWithGravity(
                  "Vous devez être connecté",
                  ToastAndroid.SHORT,
                  ToastAndroid.BOTTOM
                );
              } else {
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
        }
        const click_down = (report) => {
            if(this.state.auth.authState.accessToken == null) {
                ToastAndroid.showWithGravity(
                "Vous devez être connecté",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
                );
            } else {
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
        }

        return <Background>
            <Text style={{fontSize: 20}}>{this.state.name} {"\n"}</Text>

            <ScrollView>
                {this.state.reports.length === 0 ? <Text style={{textAlign: "center"}}>Cette machine fonctionne normalement {'\n'} {'\n'}
                 Aucun signalement récent sur cette machine</Text> 
                : this.state.reports.map((report) => {
                    return <TouchableOpacity key={report.type} activeOpacity={0.8} onPress={() => bigger_report(report)}>
                        <View style={styles.report_item}>
                            <View style={styles.report_header}>
                                <Text style={styles.report_title}
                                numberOfLines={report.type === this.state.shown_report ? 3 : 1}>{report.type}</Text>
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

            
        <FAB
          style={{
            position: 'absolute',
            margin: 16,
            right: 0,
            bottom: 0,
            backgroundColor: theme.colors.primary,
          }}
          icon="plus"
          onPress={() => {
            this.handleFABClick();
          }}
        />
        </Background>
    }

    componentDidMount() {
        console.log("This is showtime");
        this.getMachineInfos();
    }
}
export default CafetMachineInfos;