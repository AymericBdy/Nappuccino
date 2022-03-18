import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import MenuRU from '../components/MenuRU'
import HoraireTAN from '../components/TanSchedule'
import ButtonImage from '../components/ButtonImage'
import { ScrollView } from 'react-native'
import { Image, StyleSheet } from 'react-native'
import Text from 'react-native'



export default function Dashboard({ navigation, loggedIn }) {
  return (
    <Background>
      <ScrollView>
        <ButtonImage mode="contained" source={require('../assets/cappuccino-1.png')}
          onPress={() => navigation.navigate("RuScreen")} text ="RESTAURANT UNIVERSITAIRE">
        </ButtonImage>
        <ButtonImage mode="contained" source={require('../assets/cappuccino-1.png')}
          onPress={() => navigation.navigate("TanScreen")} text ="HORAIRES TAN">
        </ButtonImage>
        <ButtonImage mode="contained" source={require('../assets/cappuccino-1.png')}
          onPress={() => navigation.navigate("MapScreen")} text ="PLAN DU CAMPUS">
        </ButtonImage>
        <Header>Let’s start</Header>
        <Paragraph>
          Your amazing app starts here. Open you favorite code editor and start
          editing this project.
        </Paragraph>
        {loggedIn ? <></> : (
            <Button
            mode="contained"
            onPress={() => navigation.navigate('LoginScreen')}
            >
            Se connecter
            </Button>
        )}

      </ScrollView>
    </Background>

  )
}
