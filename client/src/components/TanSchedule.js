import React, { Component } from 'react';
import Paragraph from './Paragraph'
import { Text } from 'react-native-paper'
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions, View, StyleSheet } from 'react-native';
import Background from './Background';
import Header from './Header'
import Button from './Button'
import { theme } from '../core/theme'
import { fetchBackend } from '../helpers/Backend';

class HoraireTAN extends Component {
    state = {
        prochainPassage1: ["Chargement..."],
        prochainPassage2: [""],
        direction: 1,
    }

    checkTanSchedule(direction) {
        var searchUrl = "tan/ecn/"+direction;
        //"https://open.tan.fr/ewp/horairesarret.json/ECSU/2/"+direction;
        //pb : localhost marche pas parce que c'est le localhost de l'émulateur android
        console.log('Getting tan for '+searchUrl);
        var menu = fetchBackend(searchUrl).then(res => res.json()
        ).then(responseJson => responseJson.prochainsHoraires
        ).then(responseJson => {
            this.setState({
                prochainPassage1: "Prochain tram : "+responseJson[0].heure.concat(responseJson[0].passages[0]),
                prochainPassage2: "Le suivant: "+responseJson[1].heure.concat(responseJson[1].passages[0]),
                direction: direction
            })
        }).catch(error => {
            console.log("Horaires tan innaccessibles", error);
            this.setState({
                prochainPassage1: "Erreur",
                prochainPassage2: "Horaire indisponible",
                direction: direction
            })
        });
        return menu
    }


    render() {
        const styles = StyleSheet.create({
            text: {
                fontSize: 20,
                lineHeight: 21,
                textAlign: 'center',
                marginBottom: 12,
                padding: 20,
                borderWidth: 2,
                borderColor: theme.colors.secondary,
                width: '100%',
            },
        })
        // console.log('render menu ru')
        // console.log(this.state)

        const dirPontRousseau = () => {
            this.setState({
                prochainPassage1: ["Chargement..."],
                prochainPassage2: [""],
                direction: 1
            });
            this.checkTanSchedule(1);
        };
        const dirOrvault = () => {
            this.setState({
                prochainPassage1: ["Chargement..."],
                prochainPassage2: [""],
                direction: 2
            });
            this.checkTanSchedule(2);
        };

        console.log(this.props);
        console.log(this.state);

        return <Background>
            <Button mode={this.state.direction === 1 ? "contained" : "outlined"} onPress={dirPontRousseau}>
                Vers Gare de Pont Rousseau
            </Button>
            <Button mode={this.state.direction === 2 ? "contained" : "outlined"} onPress={dirOrvault}>
                Vers Orvault Grand-Val
            </Button>
            <Paragraph style={styles.text}>
                {this.state.prochainPassage1}{"\n"}
                {this.state.prochainPassage2}
            </Paragraph>
        </Background>
    }

    componentDidMount() {
        this.checkTanSchedule(1);
    }
}
export default HoraireTAN;