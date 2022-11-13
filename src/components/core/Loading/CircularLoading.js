import React from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { DARK_BLUE_COLOR, LIGHT_BLUE_COLOR } from '../../../constants/colors'

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 100001,
    paddingHorizontal: 14,
  },
  modeInitial: { backgroundColor: 'rgba(250, 251, 255, 0.5)' },
  text: {
    color: DARK_BLUE_COLOR,
    fontSize: 18,
    marginTop: 20,
  },
})

const CircularLoading = () => (
  <View style={StyleSheet.flatten([styles.container, styles.modeInitial])}>
    <ActivityIndicator size="large" animating color={LIGHT_BLUE_COLOR} />
    <Text style={styles.text}>Loading</Text>
  </View>
)

export default CircularLoading
