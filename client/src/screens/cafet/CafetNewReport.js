import React, { useState } from "react"
import Background from '../../components/Background'
import { View, ScrollView, Text, StyleSheet, TextInput } from 'react-native'
import BackButton from '../../components/BackButton'
import Button from '../../components/Button'
import Logo from '../../components/Logo'
import Header from '../../components/Header'
import Paragraph from "../../components/Paragraph"
import { Picker } from "@react-native-picker/picker"
import { theme } from '../../core/theme'
import {Backend, fetchBackend} from '../../helpers/Backend';
import CafetNewReport from '../../components/CafetNewReport'
import {AuthContext, useAuth} from '../../helpers/Auth';
import {
  ToastAndroid,
} from "react-native";


export default function CafetNewReportMachCaf({ route, navigation }) {
    const [pb, setPb] = useState('Unknown');
    const [text, onChangeText] = useState(null);

    const auth = useAuth();
  
/*console.log("Infos are ",route.params.infos_view);*/
    
  const validateReport = () => {
    if(pb === "Unknown") {
      //METTRE EN ROUGE
      ToastAndroid.showWithGravity(
        "Sélectionnez le type de problème",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    } else if(auth.authState.accessToken == null) {
      ToastAndroid.showWithGravity(
        "Vous devez être connecté",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }
    else {
      console.log("will do it");
      var searchUrl = "cafet/machine/newreport";

      console.log('Sending report to '+searchUrl);
      console.log('Id is '+route.params.id);

      const comment = text ? text : '';

      fetchBackend(searchUrl, {
        method: 'post',
        body: {
          machine_id: route.params.id,
          report_type: pb,
          comment: comment,
        }
      }, auth).then(res => res.json()
      ).then(responseJson => {
          if(responseJson.error) {
            console.log("Erreur pour envoyer un report sur la machine "+route.params.id, responseJson.error);
            ToastAndroid.showWithGravity(
              "Erreur",
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM
            );
          } else {
            navigation.goBack();
            if(route.params.infos_view) {
              route.params.infos_view.goBack();
            }
            ToastAndroid.showWithGravity(
              "Signalement envoyé !",
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM
            );
          }
      }).catch(error => {
          console.log("Erreur pour envoyer un report sur la machine "+route.params.id, error);
          ToastAndroid.showWithGravity(
            "Erreur",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          );
      });
    }
  };
  const name = route.params.type === 'cafe' ? 'Machine à café ' + route.params.id : "Distributeur " + route.params.id;

  return (
      <Background>
      <ScrollView>
        <Header>{name}</Header>
        <Header style={{    fontSize: 21,
    color: 'white',
    fontWeight: 'bold',
    paddingVertical: 12,}}>Quel est le problème ?</Header>
        <CafetNewReport machine_id={route.params.id} type_machine={route.params.type}
          selectedValue={pb} onValueChange={(value, index) => setPb(value)}>
        </CafetNewReport>
        <Paragraph>
          Un commentaire à ajouter ?
        </Paragraph>
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
      </ScrollView>
      </Background>
  )
}