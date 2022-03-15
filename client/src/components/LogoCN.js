import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function LogoCN() {
  return <Image source={require('../assets/LogoCN_Q.jpg')} style={styles.image} />
}

const styles = StyleSheet.create({
  image: {
    width: 230,
    height: 130,
    marginBottom: 8,
  },
})