import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import LogoCN from '../components/LogoCN'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import { View, ScrollView, Text } from 'react-native'

export default function SplashScreen({ navigation }) {
  return (
    <Background>
      <Logo />
      <Text>Chargement...</Text>
    </Background>
  )
}
