import React from 'react'
import { AppRegistry } from 'react-native'
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import App from './App'
import { name as appName } from './app.json'
import { store } from './src/redux/store'

AppRegistry.registerComponent(appName, () => () => (
  <NavigationContainer>
    <Provider store={store}>
      <SafeAreaProvider>
        <App />
      </SafeAreaProvider>
    </Provider>
  </NavigationContainer>
))
