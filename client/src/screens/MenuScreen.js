import React from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import MenuRU from '../components/MenuRU';
import HoraireTAN from '../components/TanSchedule';
import { ScrollView, Alert, Platform, StatusBar, Linking } from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import { AuthContext, useAuth } from '../helpers/Auth';

async function openLink() {
  try {
    const isAvailable = await InAppBrowser.isAvailable()
    const url = 'https://www.google.com'
    if (isAvailable) {
      InAppBrowser.open(url, {
        // iOS Properties
        dismissButtonStyle: 'cancel',
        preferredBarTintColor: 'gray',
        preferredControlTintColor: 'white',
        // Android Properties
        showTitle: true,
        toolbarColor: '#6200EE',
        secondaryToolbarColor: 'black',
        enableUrlBarHiding: true,
        enableDefaultShare: true,
        forceCloseOnRedirection: true,
      }).then((result) => {
        //Alert.alert(JSON.stringify(result))
      })
    } else Linking.openURL(url)
  } catch (error) {
    Alert.alert(error.message)
  }
}

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
          onPress={() => openLink()}>
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
