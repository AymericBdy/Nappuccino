import React from 'react'
import Background from '../../components/Background'
import { View, ScrollView, Text } from 'react-native'
import BackButton from '../../components/BackButton'
import { Button } from 'react-native-paper'
import PlanCafet from '../../components/PlanCafet'
import Header from '../../components/Header'
import { FAB } from 'react-native-paper'
import { theme } from '../../core/theme'

export default function CafetHome({ navigation }) {
  return (
      <Background>
      <View>
        <PlanCafet/>
        <Button
          mode="contained"
          style={{
            width:45,
            height:40,
            position: 'absolute',
            margin: 0,
            padding: 0,
            left: 2,
            top: 10,
            minWidth:0,
            backgroundColor: theme.colors.machcafok, // à modifier selon si la machine est en panne ou pas -- faire lien avec back de ses morts
          }}
          onPress={() => {
            navigation.navigate("CafetViewReports", {id: 1, type: "cafe"})
          }}>
        +
        </Button>
        <Button
          mode="contained"
          style={{
            width:45,
            height:40,
            position: 'absolute',
            margin: 0,
            padding: 0,
            left: 2,
            top: 60,
            minWidth:0,
            backgroundColor: theme.colors.nourritureok, // à modifier selon si la machine est en panne ou pas -- faire lien avec back de ses morts
          }}
          onPress={() => {
            navigation.navigate("CafetViewReports", {id: 2, type: "distrib"})
          }}>
        +
        </Button>
        <Button
          mode="contained"
          style={{
            width:45,
            height:40,
            position: 'absolute',
            margin: 0,
            padding: 0,
            left: 2,
            top: 110,
            minWidth:0,
            backgroundColor: theme.colors.nourritureok, // à modifier selon si la machine est en panne ou pas -- faire lien avec back de ses morts
          }}
          onPress={() => {
            navigation.navigate("CafetViewReports", {id: 3, type: "distrib"})
          }}>
        +
        </Button>
        <Button
          mode="contained"
          style={{
            width:45,
            height:40,
            position: 'absolute',
            margin: 0,
            padding: 0,
            left: 2,
            top: 160,
            minWidth:0,
            backgroundColor: theme.colors.machcafok, // à modifier selon si la machine est en panne ou pas -- faire lien avec back de ses morts
          }}
          onPress={() => {
            navigation.navigate("CafetViewReports", {id: 4, type: "cafe"})
          }}>
        +
        </Button>
        <Button
          mode="contained"
          style={{
            width:45,
            height:40,
            position: 'absolute',
            margin: 0,
            padding: 0,
            right: 60,
            bottom: 150,
            minWidth:0,
            backgroundColor: theme.colors.machcafok, // à modifier selon si la machine est en panne ou pas -- faire lien avec back de ses morts
          }}
          onPress={() => {
            navigation.navigate("CafetViewReports", {id: 5, type: "cafe"})
          }}>
        +
        </Button>
        <Button
          mode="contained"
          style={{
            width:45,
            height:40,
            position: 'absolute',
            margin: 0,
            padding: 0,
            right: 60,
            bottom: 100,
            minWidth:0,
            backgroundColor: theme.colors.nourritureok, // à modifier selon si la machine est en panne ou pas -- faire lien avec back de ses morts
          }}
          onPress={() => {
            navigation.navigate("CafetViewReports", {id: 6, type: "distrib"})
          }}>
        +
        </Button>
        <Button
          mode="contained"
          style={{
            width:45,
            height:40,
            position: 'absolute',
            margin: 0,
            padding: 0,
            right: 90,
            bottom: 45,
            minWidth:0,
            backgroundColor: theme.colors.nourritureok, // à modifier selon si la machine est en panne ou pas -- faire lien avec back de ses morts
          }}
          onPress={() => {
            navigation.navigate("CafetViewReports", {id: 7, type: "distrib"})
          }}>
        +
        </Button>
        <Button
          mode="contained"
          style={{
            width:45,
            height:40,
            position: 'absolute',
            margin: 0,
            padding: 0,
            right: 140,
            bottom: 45,
            minWidth:0,
            backgroundColor: theme.colors.machcafok, // à modifier selon si la machine est en panne ou pas -- faire lien avec back de ses morts
          }}
          onPress={() => {
            navigation.navigate("CafetViewReports", {id: 8, type: "cafe"})
          }}>
        +
        </Button>
        
      </View>
      </Background>

  )
  }
