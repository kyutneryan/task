import { PermissionsAndroid, Platform } from 'react-native'
import { CameraRoll } from '@react-native-camera-roll/camera-roll'
import Toast from 'react-native-toast-message'
import { ERROR_MESSAGES } from '../../constants/errors'
import { TOAST_MESSAGE_TYPES } from '../../constants/common'

async function hasAndroidPermission() {
  try {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE

    const hasPermission = await PermissionsAndroid.check(permission)
    if (hasPermission) {
      return true
    }

    const status = await PermissionsAndroid.request(permission)
    return status === 'granted'
  } catch {
    Toast.show({ type: TOAST_MESSAGE_TYPES.error, text1: ERROR_MESSAGES.somethingWentWrong })
  }
}

export async function getPhotos() {
  try {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return []
    }

    return CameraRoll.getPhotos({
      first: 7,
      assetType: 'Photos',
    })
  } catch {
    Toast.show({ type: TOAST_MESSAGE_TYPES.error, text1: ERROR_MESSAGES.somethingWentWrong })
  }
}
