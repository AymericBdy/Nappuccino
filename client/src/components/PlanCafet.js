import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function PlanCafet() {
  return <Image source={require('../assets/Cafet-v3.png')} style={styles.image} />
}

const styles = StyleSheet.create({
  image: {
    width: 400,
    height: 600,
    //marginBottom: 8,
  },
})
