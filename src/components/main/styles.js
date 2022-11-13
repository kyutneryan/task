import { Dimensions, StyleSheet } from 'react-native'
import { DARK_BLUE_COLOR, GHOST_WHITE_COLOR } from '../../constants/colors'

const { width } = Dimensions.get('window')

export const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  root: {
    flex: 1,
    backgroundColor: GHOST_WHITE_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBox: { width, height: width, padding: 12 },
  image: { width: '100%', height: '100%', borderRadius: 16 },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: DARK_BLUE_COLOR,
  },
  email: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 16,
    color: DARK_BLUE_COLOR,
    marginBottom: 10,
  },
})
