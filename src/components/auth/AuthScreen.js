import React from 'react'
import { Text, View } from 'react-native'
import { styles } from './styles'
import Footer from './Footer'

function AuthScreen({ children, title, footerText, buttonTitle, footerAction }) {
  return (
    <View style={styles.root}>
      <View>
        <Text style={styles.title}>{title || ''}</Text>
        <View style={styles.form}>{children}</View>
      </View>
      <Footer text={footerText} buttonTitle={buttonTitle} onBtnPress={footerAction} />
    </View>
  )
}

export default AuthScreen
