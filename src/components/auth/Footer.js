import React from 'react'
import { Button, Text, View } from 'react-native'
import { LIGHT_BLUE_COLOR } from '../../constants/colors'
import { styles } from './styles'

function Footer({ buttonTitle = '', text = '', onBtnPress = () => {} }) {
  return (
    <View style={styles.footer}>
      <Text style={styles.text}>{text}</Text>
      <Button title={buttonTitle} color={LIGHT_BLUE_COLOR} onPress={onBtnPress} />
    </View>
  )
}

export default Footer
