import React from 'react'
import { Button, View } from 'react-native'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import Toast from 'react-native-toast-message'
import { Controller, useForm } from 'react-hook-form'
import { SIGN_IN_ROUTE_NAME } from '../../constants/routes'
import { ERROR_MESSAGES, VALIDATION_MESSAGES } from '../../constants/errors'
import { LIGHT_BLUE_COLOR } from '../../constants/colors'
import TextField from '../core/TextField/TextField'
import AuthScreen from './AuthScreen'
import { firebaseApp } from '../../../firebase'
import { styles } from './styles'

const defaultValues = { email: '', password: '', confirmPassword: '' }

const validationSchema = yup.object({
  email: yup
    .string()
    .email(VALIDATION_MESSAGES.invalidEmail)
    .required(VALIDATION_MESSAGES.requiredEmail),
  password: yup
    .string()
    .required('Please Enter your password')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase and One Number'
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], VALIDATION_MESSAGES.passwordsDontMatch)
    .required(VALIDATION_MESSAGES.requiredPassword),
})

function SignUp({ navigation }) {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  })

  const onSignUp = async ({ email, password }) => {
    try {
      const auth = getAuth(firebaseApp)
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password)

      if (userCredentials) {
        Toast.show({ type: 'success', text1: 'Success' })
        reset(defaultValues)
        navigation.navigate(SIGN_IN_ROUTE_NAME, { email: userCredentials.user.email })
      } else {
        Toast.show({ type: 'error', text1: ERROR_MESSAGES.somethingWentWrong })
      }
    } catch (e) {
      Toast.show({ type: 'error', text1: e.message })
    }
  }

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
          name="email"
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
          name="password"
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
          name="confirmPassword"
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
