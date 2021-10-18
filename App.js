import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, StatusBar, Platform} from 'react-native';

import GenreResultScreen from './app/screens/GenreResultScreen';
import HomeScreen from './app/screens/HomeScreen';
import DetailsScreen from './app/screens/DetailsScreen';

import NavBar from './app/components/NavBar';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import colors from './app/config/colors';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer style={styles.container}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={
              {headerShown:false}
            }/>
          <Stack.Screen
            name="Details"
            component={DetailsScreen}
            options={{
              title: '',
              headerStyle:{
                backgroundColor: colors.dark
              },
              headerTintColor: colors.primary,
              animationTypeForReplace:'pop',
              animation:'fade'
            }}
            />
            <Stack.Screen
              name="Results"
              component={GenreResultScreen}
              options={{
                title: '',
                headerStyle:{
                  backgroundColor: colors.dark
                },
                headerTintColor: colors.primary,
                animationTypeForReplace:'pop',
                animation:'fade'
              }}
              />
        </Stack.Navigator>
        <StatusBar
          animated={true}
          backgroundColor='#121212'
          barStyle='light-content'/>
      </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  }
});
