import React from 'react'
import Background from '../components/Background'
import HoraireTAN from '../components/TanSchedule'
import { View, ScrollView } from 'react-native'
import BackButton from '../components/BackButton'
import Button from '../components/Button'
import Logo from '../components/Logo'
import Header from '../components/Header'


export default function TanScreen({ navigation }) {
  return (
      <Background>
      <View>
        <HoraireTAN />
      </View>
      </Background>

  )
}
