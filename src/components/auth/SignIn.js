import React, { useEffect } from 'react'
import { Button, View } from 'react-native'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { SIGN_UP_ROUTE_NAME } from '../../constants/routes'
import { VALIDATION_MESSAGES } from '../../constants/errors'
import TextField from '../core/TextField/TextField'
import AuthScreen from './AuthScreen'
import { styles } from './styles'
import { LIGHT_BLUE_COLOR } from '../../constants/colors'

const defaultValues = { email: '', password: '' }

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
})

function SignIn({ navigation, route }) {
  const { email } = route.params || {}

  const {
    control,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  })

  const onSignIn = async (values) => {
    console.log(values.email, values.password)
    reset(defaultValues)
  }

  useEffect(() => {
    if (email) {
      setValue('email', email)
    }
  }, [email, setValue])

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
      </View>
      <Button title="Sign In" color={LIGHT_BLUE_COLOR} onPress={handleSubmit(onSignIn)} />
    </AuthScreen>
  )
}

export default SignIn
