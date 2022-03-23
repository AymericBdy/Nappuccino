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
        <Button mode="contained"
          onPress={() => navigation.navigate("CafetNewReportMachCaf", {id: 1, type: "cafe"})}>
          Cafet signalement
        </Button>
        <Button mode="contained"
          onPress={() => navigation.navigate("CafetViewReports", {id: 1, type: "cafe"})}>
          Cafet machine à café
        </Button>
        <Button mode="contained"
          onPress={() => navigation.navigate("CafetViewReports", {id: 3, type: "distrib"})}>
          Cafet distributeur
        </Button>
      </View>
      </Background>

  )
}
