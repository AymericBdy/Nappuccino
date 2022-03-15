import React from 'react'
import Background from '../../components/Background'
import { Image, View, ScrollView, Text, TouchableOpacity, } from 'react-native'
import { FAB } from 'react-native-paper'
import BackButton from '../../components/BackButton'
import CafetMachineInfos from '../../components/CafetMachineInfos'
import Button from '../../components/Button'
import Logo from '../../components/Logo'
import Header from '../../components/Header'
import { theme } from '../../core/theme'

export default function CafetViewReports({ route, navigation }) {
  //console.log("Params are ",route.params);
  return (
      <View  style={{
        justifyContent: 'center',
        flex:1,
        margin: 10
      }}>
          <CafetMachineInfos machine_id={route.params.id} type_machine={route.params.type}></CafetMachineInfos>

        <FAB
          style={{
            position: 'absolute',
            margin: 16,
            right: 0,
            bottom: 0,
            backgroundColor: theme.colors.primary,
          }}
          icon="plus"
          onPress={() => {
            if(route.params.type == "cafe")
              navigation.navigate("CafetNewReportMachCaf", {id: route.params.id})
            else if(route.params.type == "distrib")
              navigation.navigate("CafetNewReportDistrib", {id: route.params.id})
          }}
        />
      </View >
  )
}
