import React, { Component } from 'react';
import Paragraph from './Paragraph'
import { Text } from 'react-native-paper'
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions, View, StyleSheet } from 'react-native';
import Background from './Background';
import Header from './Header'
import Button from './Button'
import FloatingButton from './FloatingButton'
import { theme } from '../core/theme'
import BackendAdress from '../helpers/Backend';

class CafetMachineInfos extends Component {
    state = {
        id: -1,
        name: 'Chargement',
        reports: [],
    }

    constructor(props) {
        super(props);
    
        this.state = {
          ...this.state,
          id: props.machine_id,
        };
    }

    getMachineInfos() {
        const id = this.state.id;
        this.setState(
            {
                ...this.state,
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
                }],
            }
        );
    }


    render() {
        const styles = StyleSheet.create({
            text: {
                fontSize: 20,
                lineHeight: 25,
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

        console.log(this.props);
        console.log(this.state);

        return <Background>
            <Text style={{fontSize: 20}}>{this.state.name} {"\n"}</Text>

            {this.state.reports.map((report) => {
                return <Paragraph style={styles.text} key={report.id}>
                    <Text>{report.name} avec {report.votes} votes {"\n"} {"\n"}</Text>
                    <View style={{                flex: 1,
                justifyContent: "space-evenly", height: 40,}}>
                    <FloatingButton mode="contained">+ 1</FloatingButton>
                    <FloatingButton mode="contained">- 1</FloatingButton>
                    </View>
                </Paragraph>
            })}
        </Background>
    }

    componentDidMount() {
        this.getMachineInfos();
    }
}
export default CafetMachineInfos;