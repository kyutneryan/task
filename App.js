import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import Toast from 'react-native-toast-message'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { firebaseApp } from './firebase'
import AuthNavigation from './src/components/auth/AuthNavigation'
import Main from './src/components/main/Main'
import {
  selectIsAuthenticating,
  selectLoggedInUser,
  setIsAuthenticating,
  setLoggedInUser,
} from './src/redux/auth/authSlice'

function App() {
  const dispatch = useDispatch()
  const loggedInUser = useSelector(selectLoggedInUser)
  const isAuthenticating = useSelector(selectIsAuthenticating)

  const auth = getAuth(firebaseApp)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      const isUserExist = await AsyncStorage.getItem('userUid')

      if (user && isUserExist) {
        const { uid, displayName, lastLoginAt, email } = user
        dispatch(setLoggedInUser({ uid, displayName, lastLoginAt, email }))
      } else {
        dispatch(setLoggedInUser(null))
        dispatch(setIsAuthenticating(false))
      }
    })
    return unsub
  }, [auth, dispatch, isAuthenticating])

  useEffect(() => {
    if (loggedInUser) {
      dispatch(setIsAuthenticating(false))
    }
  }, [dispatch, loggedInUser])

  if (isAuthenticating) {
    // there is should be loading
    return null
  }

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
