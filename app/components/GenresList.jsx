import React, { useState, useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import tv_genres from '../config/tv_genres';
import movie_genres from '../config/movie_genres';
import colors from '../config/colors';


const windowWidth = Dimensions.get('window').width;
const ITEM_SIZE = windowWidth*0.15;
const SPACING = 10;


const GenresList = ({type, navigation}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    type === 'movie' ? setData(movie_genres) : setData(tv_genres);
  },[]);

  function onPress(item) {
    navigation.navigate('Results', {
      id: item.id,
      name: item.name,
      type: type
    });
  }

  return(
    <View>
      <FlatList
        data={data}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        snapToInterval={ITEM_SIZE}
        snapToAlignment='start'
        decelerationRate='normal'
        bounces={false}
        renderToHardwareTextureAndroid
        contentContainerStyle={{ alignItems: 'flex-start', marginTop: SPACING}}
        scrollEventThrottle={16}
        renderItem={({item, index}) => {
          const color = colors.rand[index%4];

          return (
            <TouchableOpacity
                onPress={() => onPress(item)}
              >
              <View style={styles.item}>
                <View style={[styles.container, {backgroundColor: color}]}>
                  <Text style={{color:colors.dark_1_level, fontSize: 35, fontWeight: 'bold'}}>{item.name[0]}</Text>
                </View>
                <Text style={{color: '#fff', fontSize: 12, maxWidth:ITEM_SIZE*0.8, textAlign:'center'}}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    borderRadius: 50,
    backgroundColor: colors.dark_1_level,
    justifyContent:'center',
    alignItems: 'center',
    marginHorizontal: SPACING,
    padding: SPACING,
  },
  item:{
    alignItems:'center'
  }
});

export default GenresList;
