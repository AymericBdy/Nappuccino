import React, {Component} from 'react'
import Background from '../../components/Background'
import { View, ScrollView, Text, StyleSheet } from 'react-native'
import BackButton from '../../components/BackButton'
import { Button } from 'react-native-paper'
import PlanCafet from '../../components/PlanCafet'
import Header from '../../components/Header'
import { FAB } from 'react-native-paper'
import { theme } from '../../core/theme'
import { getDispenserStatus } from '../../../../server/model/bdd'
import { fetchBackend } from '../../helpers/Backend'

class CafetHome extends Component {
  state = {
      id: -1,
      status: [],
  }

  constructor(props) {
      super(props);
      this.state={
        ...this.state,
        navigation: props.navigation,
      }

  }

  getAllMachineStatus() {
    var searchUrl = "cafet/machine/list";
    //"https://open.tan.fr/ewp/horairesarret.json/ECSU/2/"+direction;
    //pb : localhost marche pas parce que c'est le localhost de l'émulateur android
    console.log('Getting machines for '+searchUrl);
    fetchBackend(searchUrl, null, null).then(res => res.json()
    ).then(responseJson => {
        console.log("Res is ",responseJson);
        this.setState({
            ...this.state,
            status: responseJson.status,
        })
    }).catch(error => {
        console.log("Erreur pour récupérer les infos de la machine "+id, error);
        this.setState(
        {
            ...this.state,
            status: [],
        })
    });
}

getColorforMachine(id) {
  const status = this.state.status.filter(machine => machine.dispenser_id==id);
  const id_caf=[1,4,5,8];
  if (status) {
    if (status.dispenser_status==="ok" && id_caf.includes(id))  {
      return(theme.colors.machcafok)
    }
    else if (status.dispenser_status==="ok") {
      return(theme.colors.nourritureok)
    }
    else if (id_caf.includes(id)) {
      return(theme.colors.machcafpls)
    }
    else {
      return(theme.colors.nourriturepls)
    }
  }
}

render() {
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
            left: 55,
            top: 30,
            minWidth:0,
            backgroundColor: this.getColorforMachine(1),
          }}
          onPress={() => {
            this.state.navigation.navigate("CafetViewReports", {id: 1, type: "cafe"})
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
            left: 55,
            top: 80,
            minWidth:0,
            backgroundColor: this.getColorforMachine(2),
          }}
          onPress={() => {
            this.state.navigation.navigate("CafetViewReports", {id: 2, type: "distrib"})
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
            left:55,
            top: 130,
            minWidth:0,
            backgroundColor: this.getColorforMachine(3),
          }}
          onPress={() => {
            this.state.navigation.navigate("CafetViewReports", {id: 3, type: "distrib"})
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
            left: 55,
            top: 180,
            minWidth:0,
            backgroundColor: this.getColorforMachine(4),
          }}
          onPress={() => {
            this.state.navigation.navigate("CafetViewReports", {id: 4, type: "cafe"})
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
            right: 130,
            bottom: 210,
            minWidth:0,
            backgroundColor: this.getColorforMachine(5),
          }}
          onPress={() => {
            this.state.navigation.navigate("CafetViewReports", {id: 5, type: "cafe"})
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
            right: 130,
            bottom: 160,
            minWidth:0,
            backgroundColor: this.getColorforMachine(6),
          }}
          onPress={() => {
            this.state.navigation.navigate("CafetViewReports", {id: 6, type: "distrib"})
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
            right: 160,
            bottom: 105,
            minWidth:0,
            backgroundColor: this.getColorforMachine(7),
          }}
          onPress={() => {
            this.state.navigation.navigate("CafetViewReports", {id: 7, type: "distrib"})
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
            right: 210,
            bottom: 105,
            minWidth:0,
            backgroundColor: this.getColorforMachine(8),
          }}
          onPress={() => {
            this.state.navigation.navigate("CafetViewReports", {id: 8, type: "cafe"})
          }}>
        +
        </Button>
        
        
      </View>
      </Background>

  )
  }
  componentDidMount() {
    this.getAllMachineStatus();
  }
}

  export default CafetHome;