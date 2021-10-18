import React from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native';

import colors from '../config/colors';

const windowWidth = Dimensions.get('window').width;
const ITEM_SIZE = windowWidth*0.6;
const SPACING = 10;
const EMPTY_ITEM_SIZE = (windowWidth - ITEM_SIZE - 2*SPACING) / 2;


const SkeletonList = () => {

  return (
      <View style={styles.container}>
        <View style={[styles.item, styles.emptyItemLeft,]}>
        </View>
        <View style={styles.item}>
        </View>
        <View style={[styles.item, styles.emptyItemRight]}>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width:'100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
   item:{
     width: ITEM_SIZE-20,
     height: ITEM_SIZE*1.5,
     borderRadius: SPACING,
     marginTop: 20,
     backgroundColor: colors.dark_1_level,
     alignSelf: 'center'
   },
   emptyItemRight:{
     width: EMPTY_ITEM_SIZE,
     borderTopRightRadius: 0,
     borderBottomRightRadius: 0,
     marginTop: 70,
     right: 0
   },
   emptyItemLeft:{
     width: EMPTY_ITEM_SIZE,
     borderTopLeftRadius: 0,
     borderBottomLeftRadius: 0,
     marginTop: 70,
     alignSelf: 'center',
     left: 0,
   }
});

export default SkeletonList;
