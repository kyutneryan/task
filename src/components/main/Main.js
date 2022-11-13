import AsyncStorage from '@react-native-async-storage/async-storage'
import { getAuth } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { Button, Dimensions, Image, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import Toast from 'react-native-toast-message'
import { firebaseApp } from '../../../firebase'
import { DARK_BLUE_COLOR, LIGHT_BLUE_COLOR } from '../../constants/colors'
import { ERROR_MESSAGES, INFO_MESSAGES } from '../../constants/errors'
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
  const [error, setError] = useState(null)

  const auth = getAuth(firebaseApp)
  const { currentUser } = auth

  const signOut = async () => {
    try {
      await AsyncStorage.setItem('userUid', '')
      await auth.signOut()
    } catch {
      Toast.show({ type: 'error', text1: ERROR_MESSAGES.somethingWentWrong })
    }
  }

  useEffect(() => {
    ;(async () => {
      try {
        const photosFromLib = await getPhotos()
        if (photosFromLib) {
          setPhotos(photosFromLib.edges)
        }
      } catch {
        Toast.show({ type: 'info', text2: ERROR_MESSAGES.somethingWentWrong })
        setError({ message: INFO_MESSAGES.accessToPhotos })
      }
    })()
  }, [])

  return (
    <SafeAreaView style={styles.safeAreaView} edges={['top']}>
      <View style={styles.root}>
        {!!error && <Text style={styles.text}>{error.message}</Text>}
        {photos.length ? (
          <>
            <Carousel
              data={photos}
              renderItem={Item}
              sliderWidth={width}
              itemWidth={width}
              onSnapToItem={(index) => setActiveSlide(index)}
            />
            <Text style={styles.text}>{currentUser.email}</Text>
            <Button title="Sign Out" color={DARK_BLUE_COLOR} onPress={signOut} />
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
