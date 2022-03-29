import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import MenuRU from '../components/MenuRU'
import HoraireTAN from '../components/TanSchedule'
import { ScrollView } from 'react-native'


export default function Dashboard({ navigation, loggedIn }) {
  return (
    <Background>
      <ScrollView>
        <Button mode="contained"
          onPress={() => navigation.navigate("RuScreen")}>
          Menu RU
        </Button>
        <Button mode="contained"
          onPress={() => navigation.navigate("TanScreen")}>
          Horaires tan
        </Button>
        <Header>Let’s start</Header>
        <Paragraph>
          Your amazing app starts here. Open you favorite code editor and start
          editing this project.
        </Paragraph>
        {loggedIn ? <></> : (
            <Button
            mode="contained"
            onPress={() => navigation.navigate('StartScreen')}
            >
            Se connecter
            </Button>
        )}

      </ScrollView>
    </Background>

  )
}
