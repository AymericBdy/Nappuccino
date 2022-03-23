import React, { useState } from "react"
import Background from '../components/Background'
import { View, ScrollView, Text, StyleSheet, TextInput } from 'react-native'
import Button from '../components/Button'
import Header from '../components/Header'
import Paragraph from "../components/Paragraph"
import { theme } from '../core/theme'
import {Backend, fetchBackend} from '../helpers/Backend';
import CafetNewReport from '../components/CafetNewReport'
import {AuthContext, useAuth} from '../helpers/Auth';
import {
  ToastAndroid,
} from "react-native";


export default function SignalementScreen({ route, navigation }) {
    const [text, onChangeText] = useState(null);

    const auth = useAuth();
  
  const validateReport = () => {
    if(auth.authState.accessToken == null && false) {
      ToastAndroid.showWithGravity(
        "Vous devez être connecté",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }
    else {
      console.log("will do it");
      var searchUrl = "cafet/machine/newreport"; // TODO changer l'url

      console.log('Sending report to '+searchUrl);
      //console.log('Id is '+route.params.id);

      const comment = text ? text : '';

      fetchBackend(searchUrl, {
        method: 'post',
        body: {
          comment: comment,
        }
      }, auth).then(res => res.json()
      ).then(responseJson => {
          navigation.goBack();
          ToastAndroid.showWithGravity(
            "Signalement envoyé !",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          );
      }).catch(error => {
          console.log("Erreur pour envoyer un report sur notre appli "+route.params.id, error);
          ToastAndroid.showWithGravity(
            "Erreur",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          );
      });
    }
  };

  return (
      <Background>
      <View>
        <Header>Quel est le problème ?</Header>
        <TextInput
          placeholder={'Commentaires'}
          multiline
          numberOfLines={4}
          onChangeText={text => onChangeText(text)}
          value={text}
          style={{textAlignVertical:'top',
          backgroundColor: theme.colors.secondary,
          borderBottomColor: '#000000',
          borderBottomWidth: 1,}}
        />
        <Button mode="contained"
            onPress={validateReport}>
            Valider
        </Button>
      </View>
      </Background>
  )
}

const styles = StyleSheet.create({
    picker: {
      marginVertical: 30,
      width: 300,
      padding: 10,
      borderWidth: 1,
      borderColor: "#666",
      backgroundColor: theme.colors.secondary,
    },
    input: {
      width:300,
      borderBottomColor:'red',
      borderBottomWidth:1,
      borderWidth: 1,
      borderColor: "#666",
      textColor: theme.colors.primary,
      backgroundColor: theme.colors.surface,
  },
  })