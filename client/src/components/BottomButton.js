import React from 'react'
import { StyleSheet } from 'react-native'
import { Button as PaperButton } from 'react-native-paper'
import { theme } from '../core/theme'

export default function BottomButton({ mode, style, ...props }) {
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
    position:'absolute',
    bottom: 0,
    width: '100%',
    alignItems:'center',
    
    borderRadius: 10
  },
  text: {
    fontFamily: 'roboto',
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 26,
    color: theme.colors.surface,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36
  }
})
