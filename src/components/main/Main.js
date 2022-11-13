import React, { useEffect, useState } from 'react'
import { Dimensions, Image, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import Toast from 'react-native-toast-message'
import { ERROR_MESSAGES, INFO_MESSAGES } from '../../constants/errors'
import { styles } from './styles'
import { getPhotos } from './utils'

const { width } = Dimensions.get('window')

const Item = ({ item }) => (
  <View style={styles.imageBox}>
    <Image style={styles.image} source={item.node.image} />
  </View>
)

function Main() {
  const [photos, setPhotos] = useState([])
  const [activeSlide, setActiveSlide] = useState(0)
  const [error, setError] = useState(null)

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
        {!!error && <Text>{error.message}</Text>}
        {!!photos.length && (
          <>
            <Carousel
              data={photos}
              renderItem={Item}
              sliderWidth={width}
              itemWidth={width}
              onSnapToItem={(index) => setActiveSlide(index)}
            />
            <Pagination
              dotsLength={photos.length}
              activeDotIndex={activeSlide}
              dotStyle={styles.dot}
              inactiveDotOpacity={0.2}
              inactiveDotScale={0.7}
              animatedDuration={100}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  )
}

export default Main
