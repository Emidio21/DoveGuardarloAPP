import React from 'react';
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import colors from '../config/colors';

const windowWidth = Dimensions.get('window').width;
const ITEM_SIZE = windowWidth*0.6;
const SPACING = 10;
const EMPTY_ITEM_SIZE = (windowWidth - ITEM_SIZE - 2*SPACING) / 2;


const MovieCard = ({ type, item, index, scrollX, navigation }) => {
  if (!item.id) {
    return <View style={[styles.posterImage,styles.emptyItem]} />;
  }

  const inputRange = [
    (index - 2) * ITEM_SIZE,
    (index - 1) * ITEM_SIZE,
    index * ITEM_SIZE,
  ];

  const onPress = () => {
    navigation.navigate('Details', {
      id: item.id,
      type: item.media_type || type
    });
  }

  const translateY = scrollX.interpolate({
    inputRange,
    outputRange: [100, 50, 100],
    extrapolate: 'clamp'
  });

  return (
    <TouchableOpacity
        onPress={onPress}
      >
      <View style={{ width: ITEM_SIZE, padding:SPACING, marginTop: -50, marginBottom:100}}>
        <Animated.View
          style={{
            transform: [{ translateY }],
            borderRadius: 34,
          }}
        >
          <Image
            source={{ uri:'https://image.tmdb.org/t/p/w500'+item?.poster_path, }}
            style={styles.posterImage}
          />
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  posterImage: {
    width: '100%',
    height: ITEM_SIZE*1.5,
    borderRadius: 10,
    backgroundColor:colors.dark_1_level,
   },
   emptyItem:{
     width: EMPTY_ITEM_SIZE,
     backgroundColor: colors.dark
   }
});

export default MovieCard;
