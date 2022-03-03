import React from 'react'
import { StyleSheet } from 'react-native'
import { Button as PaperButton } from 'react-native-paper'
import { theme } from '../core/theme'

export default function FloatingButton({ mode, style, ...props }) {
  return (
    <PaperButton
      style={[
        styles.button,
        mode === 'outlined' && { backgroundColor: theme.colors.surface },
        style,
      ]}
      labelStyle={styles.text}
      mode={mode}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    textAlign: "center",
    borderRadius: 100,
    margin: 0,
    padding: 0,
    paddingStart: 0,
    marginStart: 0,
  },
  text: {
    width: 40,
    height: 40,
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: "center",
    margin: 0,
    padding: 0,
    paddingStart: 0,
    marginStart: 0,
  },
})
