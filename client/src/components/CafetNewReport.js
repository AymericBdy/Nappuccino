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
import { fetchBackend } from '../helpers/Backend';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Picker } from "@react-native-picker/picker"

class CafetNewReport extends Component {
    state = {
        id: -1,
        selector_items: ['Chargement'],
    }

    constructor(props) {
        super(props);
    
        this.state = {
          ...this.state,
          id: props.machine_id,
          type_machine: props.type_machine,
          selected_value: props.selectedValue,
          change_callback: props.onValueChange,
        };

        console.log("State ",this.state);
    }

    getReportTypesList() {
        const id = this.state.id;
        var searchUrl = "cafet/machine/"+this.state.type_machine+"/"+id+"/report_list";

        console.log('Getting report type list on '+searchUrl);

        fetchBackend(searchUrl).then(res => res.json()
        ).then(responseJson => {
            this.setState({
                ...this.state,
                selector_items: responseJson.items,
            })
        }).catch(error => {
            console.log("Erreur pour récupérer la liste des signalements possibles. type: "+this.state.type_machine, error);
            this.setState(
            {
                ...this.state,
                selector_items: ["Erreur :/"],
            })
        });
    }


    render() {
        const items = this.state.selector_items;
        const onChange = (value, index) => {
            this.setState({
                ...this.state,
                selected_value: value,
            });
            this.state.change_callback(value, index);
        };
        return <Picker
            selectedValue={this.state.selected_value}
            onValueChange={onChange}
            mode="dialog" // Android only
            style={styles.picker}
            >
            <Picker.Item label="Sélectionnez le problème" value="Unknown" />
            {items.map((item, index) => {
                return (<Picker.Item label={item} value={item} key={index}/>) 
            })}
        </Picker>
    }

    componentDidMount() {
        this.getReportTypesList();
    }
}

const styles = StyleSheet.create({
    picker: {
      marginVertical: 30,
      width: 300,
      padding: 10,
      borderWidth: 1,
      borderColor: "#666",
      backgroundColor: theme.colors.secondary,
    },
    input: {
      width:300,
      borderBottomColor:'red',
      borderBottomWidth:1,
      borderWidth: 1,
      borderColor: "#666",
      textColor: theme.colors.primary,
      backgroundColor: theme.colors.surface,
  },
  })
  
export default CafetNewReport;