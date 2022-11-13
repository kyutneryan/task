import React from 'react'
import { Text, View, ScrollView } from 'react-native'
import Footer from './Footer'
import { styles } from './styles'

const AuthScreen = ({ children, title, footerText, buttonTitle, footerAction }) => (
  <ScrollView
    contentContainerStyle={styles.rootContent}
    keyboardShouldPersistTaps="handled"
    keyboardDismissMode="on-drag"
    style={styles.root}
  >
    <View>
      <Text style={styles.title}>{title || ''}</Text>
      <View style={styles.form}>{children}</View>
    </View>
    <Footer text={footerText} buttonTitle={buttonTitle} onBtnPress={footerAction} />
  </ScrollView>
)

export default AuthScreen
