import React from 'react'
import Toast from 'react-native-toast-message'
import { useSelector } from 'react-redux'
import AuthNavigation from './src/components/auth/AuthNavigation'
import Main from './src/components/main/Main'
import { selectIsAuthenticating, selectLoggedInUser } from './src/redux/auth/authSlice'

function App() {
  const loggedInUser = useSelector(selectLoggedInUser)
  const isAuthenticating = useSelector(selectIsAuthenticating)

  if (!loggedInUser) {
    return (
      <>
        <AuthNavigation />
        <Toast />
      </>
    )
  }

  return (
    <>
      <Main />
      <Toast />
    </>
  )
}

export default App
