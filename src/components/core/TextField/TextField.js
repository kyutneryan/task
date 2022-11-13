import React from 'react'
import { TextInput } from 'react-native'
import { GRAY_COLOR, LIGHT_BLUE_COLOR } from '../../../constants/colors'
import FormErrorMessage from '../FormErrorMessage/FormErrorMessage'
import { styles } from './styles'

const TextField = ({ placeholder, value, onChange, error, ...restProps }) => (
  <>
    <TextInput
      autoCapitalize="none"
      value={value}
      onChangeText={onChange}
      placeholder={placeholder}
      style={styles.input({ error })}
      placeholderTextColor={GRAY_COLOR}
      selectionColor={LIGHT_BLUE_COLOR}
      {...restProps}
    />
    <FormErrorMessage text={error?.message || ''} />
  </>
)

export default TextField
