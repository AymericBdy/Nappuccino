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
      <Header>Welcome to Nappuccino</Header>
      <Paragraph>
        The app to help your life on campus.
      </Paragraph>
      <Logo />
      <Button
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen')}
      >
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('Dashboard')}
      >
        Continue without login
      </Button>
    </Background>
  )
}
