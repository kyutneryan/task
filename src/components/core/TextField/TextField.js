import React from 'react'
import { TextInput } from 'react-native'
import { LIGHT_BLUE_COLOR } from '../../../constants/colors'
import { styles } from './styles'

function TextField({ placeholder, value, onChange, ...restProps }) {
  return (
    <TextInput
      autoCapitalize="none"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={styles.input}
      selectionColor={LIGHT_BLUE_COLOR}
      {...restProps}
    />
  )
}

export default TextField
