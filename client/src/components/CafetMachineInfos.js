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
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

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

        const click_up = (report) => {
            report.votes = report.votes + 1;
            this.setState(this.state);
        }
        const click_down = (report) => {
            if(report.votes > 1)
                report.votes = report.votes - 1;
            this.setState(this.state);
        }

        return <Background>
            <Text style={{fontSize: 20}}>{this.state.name} {"\n"}</Text>

            <ScrollView>
                {this.state.reports.map((report) => {
                    return <View key={report.type}> 
                        <View style={styles.text}>
                            <Text style={{
                                fontSize: 18,
                                lineHeight: 20,
                            }}>{report.name} avec {report.votes} votes {"\n"} {"\n"}</Text>

                            <View style={{
                             position: 'absolute',                                          
                             bottom: 8,
                             right: 80,
                             width: 40,
                             height: 40,
                             flex: 1,
                            }}>
                                <TouchableOpacity activeOpacity={0.4} onPress={() => click_up(report)} style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 80, 
                                    backgroundColor: theme.colors.primary,
                                    justifyContent: 'center',
                                    alignItems:'center',

                                }}><Text style={{
                                    color: theme.colors.surface
                                }}>+ 1</Text></TouchableOpacity>
                            </View>

                            {/*<View style={{
                             position: 'absolute',                                          
                             bottom: 15,
                             right: 80,
                             flex: 1,
                            }}>
                                <Text style={{
                                    fontSize: 18,
                                    lineHeight: 20,
                                }}>{report.votes}</Text>
                            </View>*/}

                            <View style={{
                             position: 'absolute',                                          
                             bottom: 8,
                             right: 30,
                             flex: 1,
                            }}>
                                <TouchableOpacity activeOpacity={0.4} onPress={() => click_down(report)} style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 80, 
                                    backgroundColor: theme.colors.primary,
                                    justifyContent: 'center',
                                    alignItems:'center',

                                }}><Text style={{
                                    color: theme.colors.surface
                                }}>- 1</Text></TouchableOpacity>
                            </View>
                        </View>
                    </View>
                })}
            </ScrollView>
        </Background>
    }

    componentDidMount() {
        this.getMachineInfos();
    }
}
export default CafetMachineInfos;