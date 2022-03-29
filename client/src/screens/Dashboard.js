import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import MenuRU from '../components/MenuRU'
import HoraireTAN from '../components/TanSchedule'
import ButtonImage from '../components/ButtonImage'
import BottomButton from '../components/BottomButton'
import FloatingButton from '../components/FloatingButton'
import { FAB } from 'react-native-paper'
import { ScrollView, View } from 'react-native'
import { Image, StyleSheet } from 'react-native'
import {Text} from 'react-native-paper'
import { theme } from '../core/theme'



const bottomButton = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
  button: {
    position:'absolute',
    bottom: 0,
    width: '100%',
    
    borderRadius: 10
  },
  text: {
    fontFamily: 'roboto',
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 26,
    color: theme.colors.surface,
  },
  header: {
    fontFamily: 'roboto',
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 26,
    textAlign: 'center',
    margin:20
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36
  }
})


export default function Dashboard({ navigation, loggedIn }) {
  return (
    <Background>
      <View style={bottomButton.container}>
        <Text style={bottomButton.header}>
          Bienvenue dans Nappucinno
        </Text>
        <ButtonImage mode="contained" source={require('../assets/logo_crous.png')}
          onPress={() => navigation.navigate("RuScreen")} text ="RESTAURANT UNIVERSITAIRE">
        </ButtonImage>
        <ButtonImage mode="contained" source={require('../assets/logo_tan.png')}
          onPress={() => navigation.navigate("TanScreen")} text ="HORAIRES TAN">
        </ButtonImage>
        <ButtonImage mode="contained" source={require('../assets/logo_map.png')}
          onPress={() => navigation.navigate("MapScreen")} text ="PLAN DU CAMPUS">
        </ButtonImage>

        <View style={bottomButton.bottom}>
        
        {loggedIn ? <></> : (
            <BottomButton
            mode="contained"
            onPress={() => navigation.navigate('StartScreen')}
            >
            Se connecter
            </BottomButton>
        )}

        </View>
        
      </View>

      
    </Background>

  )
}
