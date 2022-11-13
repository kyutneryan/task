import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SIGN_IN_ROUTE_NAME, SIGN_UP_ROUTE_NAME } from '../../constants/routes'
import { DARK_BLUE_COLOR, LIGHT_BLUE_COLOR } from '../../constants/colors'
import SignIn from './SignIn'
import SignUp from './SignUp'
import { styles } from './styles'

const { Navigator, Screen } = createMaterialTopTabNavigator()

function AuthNavigation() {
  return (
    <SafeAreaView style={styles.safeAreaView} edges={['top']}>
      <Navigator
        initialRouteName={SIGN_IN_ROUTE_NAME}
        backBehavior="none"
        keyboardDismissMode="auto"
        screenOptions={{
          swipeEnabled: false,
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
