import { StyleSheet } from 'react-native'
import { DARK_BLUE_COLOR, GRAY_COLOR, RED_COLOR } from '../../../constants/colors'

export const styles = StyleSheet.create({
  input: ({ error }) => ({
    height: 40,
    marginHorizontal: 12,
    marginTop: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: error ? RED_COLOR : GRAY_COLOR,
    borderRadius: 6,
    color: DARK_BLUE_COLOR,
  }),
})
