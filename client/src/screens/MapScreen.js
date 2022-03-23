import React, { Component } from 'react';
import Background from '../components/Background'
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';


export default function MapScreen({ navigation }) {
  return (
    <WebView source={{ uri: 'http://1c18-130-66-208-249.eu.ngrok.io/example/simple-map-2.html' }}
      style={{ marginTop: 0 }}
      surfaceView={true}
    />

  )
}
