import React, { useEffect } from 'react'
import { Button, View } from 'react-native'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Toast from 'react-native-toast-message'
import { useIsFocused } from '@react-navigation/native'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { firebaseApp } from '../../../firebase'
import { ERROR_MESSAGES, VALIDATION_MESSAGES } from '../../constants/errors'
import { SUCCESS_MESSAGE, TOAST_MESSAGE_TYPES, USER_UID } from '../../constants/common'
import { SIGN_UP_ROUTE_NAME } from '../../constants/routes'
import { LIGHT_BLUE_COLOR } from '../../constants/colors'
import TextField from '../core/TextField/TextField'
import AuthScreen from './AuthScreen'
import { setIsAuthenticating } from '../../redux/auth/authSlice'
import { setIsLoading } from '../../redux/loading/loadingSlice'
import { styles } from './styles'

const VALUE_NAMES = {
  email: 'email',
  password: 'password',
}

const defaultValues = { [VALUE_NAMES.email]: '', [VALUE_NAMES.password]: '' }

const validationSchema = yup.object({
  email: yup
    .string()
    .email(VALIDATION_MESSAGES.invalidEmail)
    .required(VALIDATION_MESSAGES.requiredEmail),
  password: yup
    .string()
    .required(VALIDATION_MESSAGES.requiredPassword)
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/, VALIDATION_MESSAGES.password),
  // 8 Characters, One Uppercase, One Lowercase and One Number
})

const SignIn = ({ navigation, route }) => {
  const dispatch = useDispatch()
  const focused = useIsFocused()

  const auth = getAuth(firebaseApp)

  const { email } = route.params || {}

  const {
    control,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues, resolver: yupResolver(validationSchema) })

  const onSignIn = async (values) => {
    try {
      dispatch(setIsLoading(true))

      const userCredentials = await signInWithEmailAndPassword(auth, values.email, values.password)

      if (userCredentials) {
        Toast.show({ type: TOAST_MESSAGE_TYPES.success, text1: SUCCESS_MESSAGE })
        reset(defaultValues)

        dispatch(setIsAuthenticating(true))

        await AsyncStorage.setItem(USER_UID, userCredentials.user.uid)
      } else {
        Toast.show({ type: TOAST_MESSAGE_TYPES.error, text1: ERROR_MESSAGES.somethingWentWrong })
      }
      dispatch(setIsLoading(false))
    } catch (e) {
      dispatch(setIsLoading(false))
      Toast.show({ type: TOAST_MESSAGE_TYPES.error, text1: e.message })
    }
  }

  useEffect(() => {
    if (email) {
      setValue(VALUE_NAMES.email, email)
    }
  }, [email, setValue])

  useEffect(() => {
    if (!focused) {
      reset(defaultValues)
    }
  }, [focused, reset])

  return (
    <AuthScreen
      title="Sign In"
      footerText="Don’t have an account?"
      buttonTitle="Sign Up"
      footerAction={() => navigation.jumpTo(SIGN_UP_ROUTE_NAME)}
    >
      <View style={styles.inputs}>
        <Controller
          control={control}
          name={VALUE_NAMES.email}
          render={({ field: { onChange, value } }) => (
            <TextField
              placeholder="Email"
              autoComplete="email"
              keyboardType="email-address"
              value={value}
              onChange={onChange}
              error={errors.email}
            />
          )}
        />
        <Controller
          control={control}
          name={VALUE_NAMES.password}
          render={({ field: { onChange, value } }) => (
            <TextField
              secureTextEntry
              placeholder="Password"
              autoComplete="password"
              value={value}
              onChange={onChange}
              error={errors.password}
            />
          )}
        />
      </View>
      <Button title="Sign In" color={LIGHT_BLUE_COLOR} onPress={handleSubmit(onSignIn)} />
    </AuthScreen>
  )
}

export default SignIn
