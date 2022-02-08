import React from 'react'
import Background from '../components/Background'
import HoraireTAN from '../components/TanSchedule'
import { View, ScrollView } from 'react-native'
import BackButton from '../components/BackButton'
import Button from '../components/Button'
import Logo from '../components/Logo'
import Header from '../components/Header'
import MenuRU from '../components/MenuRU'


export default function RuScreen({ navigation }) {
  return (
    <Background>

      <MenuRU />

      <BackButton goBack={navigation.goBack} />
    </Background>

  )
}
