import React, { useState, useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import MovieCard from './MovieCard';
import SkeletonList from './SkeletonList';

const windowWidth = Dimensions.get('window').width;
const ITEM_SIZE = windowWidth*0.6;
const SPACING = 10;
const EMPTY_ITEM_SIZE = (windowWidth - ITEM_SIZE - 2*SPACING) / 2;

const MovieList = ({type, data, navigation}) => {
  const scrollX = useRef(new Animated.Value(0)).current;

  return(
    <View>
      <Animated.FlatList
        data={data}
        horizontal
        keyExtractor={(item) => item.id ? item.id.toString() : item.key}
        snapToInterval={ITEM_SIZE}
        snapToAlignment='start'
        decelerationRate='normal'
        bounces={false}
        renderToHardwareTextureAndroid
        contentContainerStyle={{ alignItems: 'center' }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        renderItem={({item, index}) => {
          return <MovieCard type={type} item={item} index={index} scrollX={scrollX} navigation={navigation}/>
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MovieList;
