import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import MenuRU from '../components/MenuRU'
import HoraireTAN from '../components/TanSchedule'
import { ScrollView } from 'react-native'


export default function Menu({ navigation }) {
  console.log("Menu opened");
  navigation
  return (
    <Background>
      <ScrollView>
        <Button mode="outlined"
         onPress={() => navigation.replace("Dashboard")}>
          ACCUEIL
        </Button>
        <Button mode="outlined">
          PLAN DE L'ECOLE
        </Button>
        <Button mode="outlined">
          INFOS CAFET
        </Button>
        <Button mode="outlined"
         onPress={() => navigation.replace("RuScreen")}>
          INFOS RU
        </Button>
        <Button mode="outlined"
         onPress={() => navigation.replace("TanScreen")}>
          INFOS TAN
        </Button>
        <Button mode="outlined">
          ANNUAIRE DU PERSONNEL
        </Button>
        <Button
          mode="outlined"
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: 'StartScreen' }],
            })
          }
        >
          LOGOUT
        </Button>

      </ScrollView>
    </Background>

  )
}
