import React, { useEffect } from 'react'
import { Button, View } from 'react-native'
import * as yup from 'yup'
import Toast from 'react-native-toast-message'
import { useDispatch } from 'react-redux'
import { useIsFocused } from '@react-navigation/native'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { firebaseApp } from '../../../firebase'
import { SIGN_IN_ROUTE_NAME } from '../../constants/routes'
import { ERROR_MESSAGES, VALIDATION_MESSAGES } from '../../constants/errors'
import { LIGHT_BLUE_COLOR } from '../../constants/colors'
import TextField from '../core/TextField/TextField'
import AuthScreen from './AuthScreen'
import { setIsLoading } from '../../redux/loading/loadingSlice'
import { styles } from './styles'
import { SUCCESS_MESSAGE, TOAST_MESSAGE_TYPES } from '../../constants/common'

const VALUE_NAMES = {
  email: 'email',
  password: 'password',
  confirmPassword: 'confirmPassword',
}

const defaultValues = {
  [VALUE_NAMES.email]: '',
  [VALUE_NAMES.password]: '',
  [VALUE_NAMES.confirmPassword]: '',
}

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
  confirmPassword: yup
    .string()
    .oneOf([yup.ref(VALUE_NAMES.password), null], VALIDATION_MESSAGES.passwordsDontMatch)
    .required(VALIDATION_MESSAGES.requiredPassword),
})

const SignUp = ({ navigation }) => {
  const dispatch = useDispatch()
  const focused = useIsFocused()

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues, resolver: yupResolver(validationSchema) })

  const onSignUp = async ({ email, password }) => {
    try {
      dispatch(setIsLoading(true))
      const auth = getAuth(firebaseApp)
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password)

      if (userCredentials) {
        Toast.show({ type: TOAST_MESSAGE_TYPES.success, text1: SUCCESS_MESSAGE })
        reset(defaultValues)
        navigation.navigate(SIGN_IN_ROUTE_NAME, { email: userCredentials.user.email })
      } else {
        Toast.show({ type: TOAST_MESSAGE_TYPES.error, text1: ERROR_MESSAGES.somethingWentWrong })
      }
      dispatch(setIsLoading(false))
    } catch (e) {
      Toast.show({ type: TOAST_MESSAGE_TYPES.error, text1: e.message })
      dispatch(setIsLoading(false))
    }
  }

  useEffect(() => {
    if (!focused) {
      reset(defaultValues)
    }
  }, [focused, reset])

  return (
    <AuthScreen
      title="Create Your Account"
      footerText="Already have an account?"
      buttonTitle="Sign In"
      footerAction={() => navigation.jumpTo(SIGN_IN_ROUTE_NAME)}
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
        <Controller
          control={control}
          name={VALUE_NAMES.confirmPassword}
          render={({ field: { onChange, value } }) => (
            <TextField
              secureTextEntry
              placeholder="Confirm Password"
              autoComplete="password"
              value={value}
              onChange={onChange}
              error={errors.confirmPassword}
            />
          )}
        />
      </View>
      <Button title="Sign Up" color={LIGHT_BLUE_COLOR} onPress={handleSubmit(onSignUp)} />
    </AuthScreen>
  )
}

export default SignUp
