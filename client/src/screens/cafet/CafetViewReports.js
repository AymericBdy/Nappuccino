import React from 'react'
import Background from '../../components/Background'
import { Image, View, ScrollView, Text, TouchableOpacity, } from 'react-native'
import { FAB } from 'react-native-paper'
import BackButton from '../../components/BackButton'
import Button from '../../components/Button'
import Logo from '../../components/Logo'
import Header from '../../components/Header'
import { theme } from '../../core/theme'

export default function CafetViewReports({ navigation }) {
  return (
      <View  style={{

        justifyContent: 'center',
        flex:1,
        margin: 10
      }}>
        <ScrollView>
          <Text style={{fontSize: 50}}>Cafet infos d'une machine</Text>
          <Text style={{fontSize: 50}}>Cafet infos d'une machine</Text>
          <Text style={{fontSize: 50}}>Cafet infos d'une machine</Text>
          <Text style={{fontSize: 50}}>Cafet infos d'une machine</Text>
          <Text style={{fontSize: 50}}>Cafet infos d'une machine</Text>
          <Text style={{fontSize: 50}}>Cafet infos d'une machine</Text>
          <Text style={{fontSize: 50}}>Cafet infos d'une machine</Text>
          <Text style={{fontSize: 50}}>Cafet infos d'une machine</Text>
        </ScrollView>

        <FAB
        style={{
          position: 'absolute',
          margin: 16,
          right: 0,
          bottom: 0,
        }}
        icon="plus"
        onPress={() => navigation.navigate("CafetNewReport")}
      />
      </View >
  )
}
