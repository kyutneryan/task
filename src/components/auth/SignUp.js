import React from 'react'
import { SIGN_IN_ROUTE_NAME } from '../../constants/routes'
import TextField from '../core/TextField/TextField'
import AuthScreen from './AuthScreen'

function SignUp({ navigation }) {
  return (
    <AuthScreen
      title="Create Your Account"
      footerText="Already have an account?"
      buttonTitle="Sign In"
      footerAction={() => navigation.jumpTo(SIGN_IN_ROUTE_NAME)}
    >
      <TextField placeholder="Email" autoComplete="email" keyboardType="email-address" />
      <TextField placeholder="Password" autoComplete="password" secureTextEntry />
    </AuthScreen>
  )
}

export default SignUp
