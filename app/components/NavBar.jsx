import React, { useState, useRef } from 'react'
import {
  Animated,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

import { Entypo, MaterialIcons } from '@expo/vector-icons';
import colors from '../config/colors';

const NavBar = ({boxClose, setBoxClose, searchTextValue, setSearchTextValue}) => {
  const slideAnim = useRef(new Animated.Value(0)).current;

  const slideIn = () => {
    Animated.timing(slideAnim, {
      toValue: 100,
      duration: 400,
      useNativeDriver: false
    }).start(finish => {
      finish && setBoxClose(false);
    });
  }

  const slideOut = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 400,
      useNativeDriver: false
    }).start(finish => {
      finish && setBoxClose(true)
   });
  }

  const handleTextChange = (value) =>{
    setSearchTextValue(value);
  }

  const handleClearText = () =>{
    setSearchTextValue('')
  }


  return(
    <View style={styles.navBar}>
      <Image resizeMode='contain' style={styles.logo} source={require('../assets/logo500.png')}/>
      <View style={styles.navBarRight}>
        <Animated.View
          style={[
            styles.searchView,
            {
              flex: slideAnim,
            }
          ]}
        >
          {
            boxClose ?
            <Pressable onPress={() => {slideIn()}}>
              <MaterialIcons name="search" size={24} color={colors.primary}/>
            </Pressable> :
            <Pressable onPress={() => {slideOut()}}>
              <MaterialIcons name="arrow-back" size={24} color={colors.primary}/>
            </Pressable>
          }

          {!boxClose &&
          <TextInput
            style={styles.searchTextInput}
            autoFocus={true}
            placeholder='Cerca'
            value={searchTextValue}
            onChangeText={(text)=>handleTextChange(text)}
            />}

          {
            !boxClose && searchTextValue.length>0 &&
            <Pressable onPress={() => handleClearText()}>
              <MaterialIcons name="close" size={24} color={colors.primary}/>
            </Pressable>
          }

        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logo:{
    width:100,
    height: 100,
  },
  navBar: {
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width:'100%',
    backgroundColor: colors.dark,
  },
  navBarRight:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  searchView:{
    height: 50,
    width: 50,
    maxWidth:'90%',
    backgroundColor: colors.dark_1_level,
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 15,
    paddingRight: 15,
    marginLeft:7,
  },
  searchTextInput: {
    flex: 1,
    marginLeft: 5,
    color:'#fff',
  }
});

export default NavBar;
