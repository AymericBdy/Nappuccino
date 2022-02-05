import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import MenuRU from '../components/MenuRU'
import HoraireTAN from '../components/HoraireTAN'
import { ScrollView } from 'react-native'


export default function Dashboard({ navigation }) {
  return (
    <ScrollView>
      <Background>
        <Header>Au menu ce midi</Header>
        <MenuRU />
        <Header>La TAN (Ligne 2 direction Gare de Pont Rousseau) </Header>
        <HoraireTAN />
        <Header>Let’s start</Header>
        <Paragraph>
          Your amazing app starts here. Open you favorite code editor and start
          editing this project.
        </Paragraph>
        <Button
          mode="contained"
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: 'StartScreen' }],
            })
          }
        >
          Logout
        </Button>

      </Background>
    </ScrollView>

  )
}
