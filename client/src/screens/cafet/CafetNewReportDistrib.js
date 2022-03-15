import React, { useState } from "react"
import Background from '../../components/Background'
import { View, ScrollView, Text, StyleSheet } from 'react-native'
import BackButton from '../../components/BackButton'
import Button from '../../components/Button'
import Logo from '../../components/Logo'
import Header from '../../components/Header'
import { Picker } from "@react-native-picker/picker"
import { theme } from '../../core/theme'

// TODO : modifier les items avec la liste des trucs à bouffer

export default function CafetNewReportDistrib({ navigation }) {
    const [pb, setPb] = useState('Unknown')
    var items=["Paiement sans contact impossible", "C'est pas du café cette machine :)", "Plus de sucre", "Expresso", "Expresso allongé", 
    "Expresso crème", "Expresso crème allongé", "Ristretto", "Café soluble décaféiné", "Café soluble au lait", 
    "Cappuccino", "Cappuccino noisette", "Cappuccino à la française", "Latte", "Boisson au cacao", "Viennois au cacao",
    "Viennois praliné", "Thé vert menthe", "Thé Earl Grey", "Thé Earl Grey au lait", "Potage"]
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
      <Button mode="contained"
          onPress={() => navigation.goBack()}>
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
  })