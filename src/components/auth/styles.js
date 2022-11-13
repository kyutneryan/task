import { StyleSheet } from 'react-native'
import { DARK_BLUE_COLOR, GHOST_WHITE_COLOR } from '../../constants/colors'

export const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  root: {
    backgroundColor: GHOST_WHITE_COLOR,
    paddingHorizontal: 14,
    paddingVertical: 28,
  },
  rootContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  footer: {
    alignItems: 'center',
  },
  text: {
    margin: 5,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 16,
    color: DARK_BLUE_COLOR,
  },
  form: {
    marginTop: 20,
  },
  inputs: {
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 16,
    color: DARK_BLUE_COLOR,
    textAlign: 'center',
  },
})
