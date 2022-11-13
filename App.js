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
import CircularLoading from './src/components/core/Loading/CircularLoading'
import { selectIsLoading } from './src/redux/loading/loadingSlice'
import { USER_UID } from './src/constants/common'
import { WHITE_COLOR } from './src/constants/colors'

const App = () => {
  const dispatch = useDispatch()
  const loggedInUser = useSelector(selectLoggedInUser)
  const isAuthenticating = useSelector(selectIsAuthenticating)
  const isLoading = useSelector(selectIsLoading)

  const auth = getAuth(firebaseApp)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      const isUserExist = await AsyncStorage.getItem(USER_UID)

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
    return <CircularLoading backgroundColor={WHITE_COLOR} />
  }

  if (!loggedInUser) {
    return (
      <>
        <AuthNavigation />
        <Toast />
        {isLoading && <CircularLoading />}
      </>
    )
  }

  return (
    <>
      <Main />
      <Toast />
      {isLoading && <CircularLoading />}
    </>
  )
}

export default App
