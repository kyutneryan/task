import React from 'react'

import Toast from 'react-native-toast-message'
import AuthNavigation from './src/components/auth/AuthNavigation'
import Main from './src/components/main/Main'

function App() {
  if (true) {
    return <Main />
  }

  return (
    <>
      <AuthNavigation />
      <Toast />
    </>
  )
}

export default App
