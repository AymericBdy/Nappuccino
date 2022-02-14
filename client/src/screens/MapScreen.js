import React, { Component } from 'react';
import Background from '../components/Background'
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';


export default function MapScreen({ navigation }) {
  return (
    <WebView source={{ uri: 'https://map-gl-indoor.github.io/' }}
      style={{ marginTop: 20 }} />

  )
}
