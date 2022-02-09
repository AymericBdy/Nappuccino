// React Native Popup Menu – Over Flow Menu
// https://aboutreact.com/react-native-popup-menu/

import React from 'react';
//import react in our code.
import {View, Text, Image, TouchableOpacity} from 'react-native';
//import all the components we are going to use.

const MenuButton = (props) => {
  return (
    <View>
        <TouchableOpacity onPress={() => {
        return props.route.name === 'MenuScreen' ? props.navigation.goBack() :
        props.navigation.navigate("MenuScreen");}}>
            <Image
            source={props.route.name === 'MenuScreen' ? require('../assets/menu_white_outlined.png') : require('../assets/menu_white.png')}
            style={{width: 30, height: 30}}
            />
        </TouchableOpacity>
    </View>
  );
};

export default MenuButton;