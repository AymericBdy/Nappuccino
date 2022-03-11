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


export default function CafetNewReportMachCaf({ navigation }) {
    const [pb, setPb] = useState('Unknown');
    var items=["Paiement sans contact impossible", "Pas de gobelets", "Pas de sucre", "Expresso", "Expresso allongé", 
    "Expresso crème", "Expresso crème allongé", "Ristretto", "Café soluble décaféiné", "Café soluble au lait", 
    "Cappuccino", "Cappuccino noisette", "Cappuccino à la française", "Latte", "Boisson au cacao", "Viennois au cacao",
    "Viennois praliné", "Thé vert menthe", "Thé Earl Grey", "Thé Earl Grey au lait", "Potage"];
    const [text, onChangeText] = React.useState(null);
  

  return (
      <Background>
      <View>
      <Header>Quel est le problème ?</Header>
      <Picker
        selectedValue={pb}
        onValueChange={(value, index) => setPb(value)}
        mode="dialog" // Android only
        style={styles.picker}
      >
        <Picker.Item label="Sélectionnez le problème" value="Unknown" />
        {items.map((item, index) => {
        return (<Picker.Item label={item} value={index} key={index}/>) 
    })}
      </Picker>
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
          onPress={() => {
            if (pb!="Unknown")
            navigation.navigate("CafetHome")}}>
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