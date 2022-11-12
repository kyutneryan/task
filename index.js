import React from 'react'
import { AppRegistry } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import App from './App'
import { name as appName } from './app.json'

AppRegistry.registerComponent(appName, () => () => (
  <NavigationContainer>
    <SafeAreaProvider>
      <App />
    </SafeAreaProvider>
  </NavigationContainer>
))
