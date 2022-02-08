import React, { Component } from 'react';
import Paragraph from './Paragraph'
import { Text } from 'react-native-paper'
import Header from '../components/Header'
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions, View, StyleSheet } from 'react-native';

class MenuRU extends Component {
    state = {
        html: "Chargement du menu..."
    }

    checkMenu() {
        var searchUrl = `https://www.crous-nantes.fr/restaurant/resto-u-le-tertre/`;
        var menu = fetch(searchUrl
        ).then(res => res.text()
        ).then(res => res.match("<div><h4>Déjeuner(.)*</li></ul></div></div></div>")[0]
        ).then(str => str.substring(17)
        ).then(all => {
            this.setState({ html: all })
        }).catch(error => {
            console.log(error);
            this.setState({html: "Menu non communiqué"});
        });
        return menu
    }


    render() {
        const thisData = this.state.html;
        // const { width } = useWindowDimensions();
        function createMarkup() {
            return { html: thisData };
        }
        const classesStyles = {
            'name': {
                fontWeight: 'bold',
                color: '#fab500',
                fontSize: 15,
                lineHeight: 17,
                // textAlign: 'center',
                marginBottom: 0,
            },
            'liste-plats': {
                color: '#FFFFFF',
                textDecorationLine: 'none',
                fontSize: 14,
                // , fontFamily: 'Montserrat-Bold',
                lineHeight: 19
            }
        }
        // console.log('render menu ru')
        // console.log(this.state)
        return <View>
            <Header>Au menu ce midi</Header>
            <RenderHtml
                contentWidth={100}
                source={this.state}
                classesStyles={classesStyles}
            />
        </View>
    }

    componentDidMount() {
        this.checkMenu();
    }

    // export default function MenuRU(props) {
    //     return <Text style={styles.text} {...props} />
}
export default MenuRU;