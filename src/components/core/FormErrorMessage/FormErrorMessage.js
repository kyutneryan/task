import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { RED_COLOR } from '../../../constants/colors'

const styles = StyleSheet.create({
  textStyle: {
    color: RED_COLOR,
    minHeight: 16,
    marginLeft: 14,
  },
})

const FormErrorMessage = ({ text = '' }) => <Text style={styles.textStyle}>{text}</Text>

export default FormErrorMessage
