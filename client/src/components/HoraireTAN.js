import React, { Component } from 'react';
import Paragraph from './Paragraph'
import { Text } from 'react-native-paper'
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions, View, StyleSheet } from 'react-native';

class HoraireTAN extends Component {
    state = {
        prochainPassage1: ["Horaire indisponible"],
        prochainPassage2: ["Horaire indisponible"]
    }

    checkMenu() {
        var searchUrl = `https://open.tan.fr/ewp/horairesarret.json/ECSU/2/1`;
        var menu = fetch(searchUrl
        ).then(res => res.json()
        ).then(responseJson => responseJson.prochainsHoraires
        ).then(responseJson => {
            this.setState({
                prochainPassage1: responseJson[0].heure.concat(responseJson[0].passages[0]),
                prochainPassage2: responseJson[1].heure.concat(responseJson[1].passages[0])
            })
        });
        return menu
    }


    render() {
        const thisData = this.state.html;
        const styles = StyleSheet.create({
            text: {
                fontSize: 15,
                lineHeight: 21,
                textAlign: 'center',
                marginBottom: 12,
            },
        })
        // console.log('render menu ru')
        // console.log(this.state)
        return <Paragraph>
            Prochain passage: {this.state.prochainPassage1}{"\n"}
            Le suivant: {this.state.prochainPassage2}
        </Paragraph>
    }

    componentDidMount() {
        this.checkMenu();
    }
}
export default HoraireTAN;