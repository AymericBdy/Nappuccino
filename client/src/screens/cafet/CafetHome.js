import React from 'react'
import Background from '../../components/Background'
import { View, ScrollView, Text } from 'react-native'
import BackButton from '../../components/BackButton'
import Button from '../../components/Button'
import Logo from '../../components/Logo'
import Header from '../../components/Header'

export default function CafetHome({ navigation }) {
  return (
      <Background>
      <View>
        <Text>Cafet home</Text>
        <Button mode="contained"
          onPress={() => navigation.navigate("CafetNewReport")}>
          Cafet signalement
        </Button>
        <Button mode="contained"
          onPress={() => navigation.navigate("CafetViewReports")}>
          Cafet liste signalements
        </Button>
      </View>
      </Background>

  )
}
