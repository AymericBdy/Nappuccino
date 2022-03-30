import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import LogoCN from '../components/LogoCN'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'

export default function StartScreen({ navigation }) {
  return (
    <Background>
      <LogoCN />
      <Header>Bienvenue dans Nappuccino</Header>
      <Paragraph>
        L'application pour faciliter votre vie sur le campus.
      </Paragraph>
      <Logo />
      <Button
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen')}
      >
        S'authentifier
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('AppDrawer', { screen: 'Dashboard'})}
      >
        Continuer sans s'authentifier
      </Button>
    </Background>
  )
}
