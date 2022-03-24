import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import MenuRU from '../components/MenuRU'
import HoraireTAN from '../components/TanSchedule'
import { ScrollView } from 'react-native'
import {AuthContext, useAuth} from '../helpers/Auth';


export default function Menu({ navigation, loggedIn }) {
  const auth = useAuth();
  const onLogout = () => auth.facade.logout();
  return (
    <Background>
      <ScrollView>
        <Button mode="outlined"
         onPress={() => navigation.replace("Dashboard")}>
          ACCUEIL
        </Button>
        <Button mode="outlined"
         onPress={() => navigation.replace("MapScreen")}>
          PLAN DE L'ECOLE
        </Button>
        <Button mode="outlined"
        onPress={() => navigation.replace("CafetHome")}>
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
        <Button mode="outlined"
        onPress={() => navigation.replace("AnnuaireScreen")}>
          ANNUAIRE DU PERSONNEL
        </Button>
        <Button mode="outlined"
        onPress={() => navigation.replace("SignalementScreen")}>
          UN PROBLEME ?
        </Button>
        <Button
          mode="outlined"
          onPress={() => {
            onLogout().then(() => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'StartScreen' }],
              })
            });
          }}
        >
          {loggedIn ? 'DECONNEXION' : 'CONNEXION'}
        </Button>

      </ScrollView>
    </Background>

  )
}
