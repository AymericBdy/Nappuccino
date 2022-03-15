import React from 'react'
import { TouchableOpacity, Image, StyleSheet, Text, View } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { theme } from '../core/theme'

export default function BackButton({ goBack }) {
  return (
    <View>
      <TouchableOpacity onPress={goBack}>
        <Image
          style={styles.image}
          source={require('../assets/arrow_white.png')}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10 + getStatusBarHeight(),
    left: 4,
  },
  image: {
    width: 24,
    height: 24,
  },
})
