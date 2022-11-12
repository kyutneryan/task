import React from 'react'
import { LogBox } from 'react-native'
import Toast from 'react-native-toast-message'
import AuthNavigation from './src/components/auth/AuthNavigation'

function App() {
  LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core'])
  return (
    <>
      <AuthNavigation />
      <Toast />
    </>
  )
}

export default App
