import React from 'react'
import { StyleSheet } from 'react-native'
import { Button as PaperButton } from 'react-native-paper'
import { theme } from '../core/theme'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Image } from 'react-native'
import {Text} from 'react-native'


export default function Button({ mode, style, ...props }) {
  return (
    <TouchableOpacity activeOpacity={0.4} onPress={props.onPress} 
        style={styles.button}>
        <Text style={styles.text}>{props.text}</Text>
        <Image source={props.source} style={styles.image} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 330,
    height: 100,
    marginVertical: 10,
    paddingVertical: 2,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems:'center',
    borderRadius: 10,
  },
  text: {
    fontFamily:'roboto',
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 26,
    textAlign:'center',
    color: theme.colors.surface,
  },
  image: {
    width: 90,
    height: 60,
    marginBottom: 0,
    justifyContent: 'center',
    resizeMode: 'contain'
  },

})
