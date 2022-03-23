import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function PlanCafet() {
  return <Image source={require('../assets/Cafet-v2.png')} style={styles.image} />
}

const styles = StyleSheet.create({
  image: {
    width: 270,
    height: 500,
    //marginBottom: 8,
  },
})
