import React from 'react'
import { SIGN_UP_ROUTE_NAME } from '../../constants/routes'
import TextField from '../core/TextField/TextField'
import AuthScreen from './AuthScreen'

function SignIn({ navigation }) {
  return (
    <AuthScreen
      title="Sign In"
      footerText="Don’t have an account?"
      buttonTitle="Sign Up"
      footerAction={() => navigation.jumpTo(SIGN_UP_ROUTE_NAME)}
    >
      <TextField placeholder="Email" autoComplete="email" keyboardType="email-address" />
      <TextField placeholder="Password" autoComplete="password" secureTextEntry />
    </AuthScreen>
  )
}

export default SignIn
