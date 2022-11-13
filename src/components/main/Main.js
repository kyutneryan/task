import AsyncStorage from '@react-native-async-storage/async-storage'
import { getAuth } from 'firebase/auth'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Button, Dimensions, Image, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import Toast from 'react-native-toast-message'
import { useDispatch } from 'react-redux'
import { firebaseApp } from '../../../firebase'
import { LIGHT_BLUE_COLOR } from '../../constants/colors'
import { ERROR_MESSAGES } from '../../constants/errors'
import { setIsLoading } from '../../redux/loading/loadingSlice'
import CircularLoading from '../core/Loading/CircularLoading'
import { styles } from './styles'
import { getPhotos } from './utils'

const { width } = Dimensions.get('window')

const Item = ({ item }) => (
  <View style={styles.imageBox}>
    <Image style={styles.image} resizeMode="cover" source={item.node.image} />
  </View>
)

const Main = () => {
  const [photos, setPhotos] = useState([])
  const [activeSlide, setActiveSlide] = useState(0)
  const [loading, setLoading] = useState(true)

  const auth = getAuth(firebaseApp)
  const { currentUser } = auth

  const dispatch = useDispatch()

  const signOut = async () => {
    dispatch(setIsLoading(true))
    try {
      await AsyncStorage.setItem('userUid', '')
      await auth.signOut()
      dispatch(setIsLoading(false))
    } catch {
      dispatch(setIsLoading(false))
      Toast.show({ type: 'error', text1: ERROR_MESSAGES.somethingWentWrong })
    }
  }

  const getPhonePhotos = useCallback(async () => {
    try {
      const photosFromLib = await getPhotos()
      if (photosFromLib) {
        setPhotos(photosFromLib?.edges || [])
      }
      setLoading(false)
    } catch {
      setLoading(false)
      Toast.show({ type: 'info', text2: ERROR_MESSAGES.somethingWentWrong })
    }
  }, [])

  const isEmpty = useMemo(() => !photos.length && !loading, [loading, photos.length])

  useEffect(() => {
    getPhonePhotos()
  }, [getPhonePhotos])

  if (loading) {
    return <CircularLoading backgroundColor="white" />
  }

  return (
    <SafeAreaView style={styles.safeAreaView} edges={['top']}>
      <View style={styles.root}>
        {!isEmpty ? (
          <>
            <Carousel
              data={photos}
              renderItem={Item}
              sliderWidth={width}
              itemWidth={width}
              onSnapToItem={(index) => setActiveSlide(index)}
            />
            <Text style={styles.text}>{currentUser?.email}</Text>
            <Button title="Sign Out" color={LIGHT_BLUE_COLOR} onPress={signOut} />
            <Pagination
              dotsLength={photos.length}
              activeDotIndex={activeSlide}
              dotStyle={styles.dot}
              inactiveDotOpacity={0.2}
              inactiveDotScale={0.7}
              animatedDuration={10}
            />
          </>
        ) : (
          <>
            <Text style={styles.text}>No Photos Yet</Text>
            <Button title="Sign Out" color={LIGHT_BLUE_COLOR} onPress={signOut} />
          </>
        )}
      </View>
    </SafeAreaView>
  )
}

export default Main
