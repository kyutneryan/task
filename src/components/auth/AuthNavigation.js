import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import SignIn from './SignIn'
import SignUp from './SignUp'
import { SIGN_IN_ROUTE_NAME, SIGN_UP_ROUTE_NAME } from '../../constants/routes'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from './styles'
import { DARK_BLUE_COLOR, LIGHT_BLUE_COLOR } from '../../constants/colors'

const { Navigator, Screen } = createMaterialTopTabNavigator()

function AuthNavigation() {
  return (
    <SafeAreaView style={styles.safeAreaView} edges={['top']}>
      <Navigator
        initialRouteName={SIGN_UP_ROUTE_NAME}
        backBehavior="none"
        keyboardDismissMode="auto"
        screenOptions={{
          tabBarActiveTintColor: DARK_BLUE_COLOR,
          tabBarIndicatorStyle: {
            backgroundColor: LIGHT_BLUE_COLOR,
          },
        }}
      >
        <Screen name={SIGN_IN_ROUTE_NAME} component={SignIn} />
        <Screen name={SIGN_UP_ROUTE_NAME} component={SignUp} />
      </Navigator>
    </SafeAreaView>
  )
}

export default AuthNavigation
