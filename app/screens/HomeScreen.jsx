import React, { useState, useEffect} from 'react';
import {
  Image,
  Keyboard,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import NavBar from '../components/NavBar';
import MovieList from '../components/MovieList';
import GenresList from '../components/GenresList';
import SkeletonList from '../components/SkeletonList';

import colors from '../config/colors';

const HomeScreen = ({navigation}) => {
  const [searchTextValue, setSearchTextValue] = useState('');
  const [boxClose, setBoxClose] = useState(true)
  const [searchMovies, setSearchMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingSeries, setTrendingSeries] = useState([]);

  const getMovieSearch = async () => {
    try{
      const response = await fetch('https://api-filmchecker.herokuapp.com/multi_search/' + searchTextValue + '/1');
      let movies = await response.json();
      movies=movies.results;
      setSearchMovies([{key:'empty-left'} , ...movies, {key:'empty-right'}]);
    } catch(e){
      console.log(e);
    }
  }

  const getMovies = async (type) => {
    try{
      const response = await fetch('https://api-filmchecker.herokuapp.com/trending/' + type);
      let movies = await response.json();
      type==='movie' ?
        setTrendingMovies([{key:'empty-left'} , ...movies, {key:'empty-right'}]) :
        setTrendingSeries([{key:'empty-left'} , ...movies, {key:'empty-right'}]);
    } catch(e){
      console.log(e);
    }
  }

  useEffect(() => {
    searchTextValue && getMovieSearch();
  }, [searchTextValue]);

  useEffect(() => {
    getMovies('movie');
    getMovies('tv');
  }, [])


  return(
      <View style={styles.container}>
        <NavBar boxClose={boxClose} setBoxClose={setBoxClose} searchTextValue={searchTextValue} setSearchTextValue={setSearchTextValue}/>
        {!boxClose && searchTextValue!=='' ?
        <View>
          <Text style={styles.titleText}>Film per: {searchTextValue}</Text>
          {searchMovies.length<1 ? <SkeletonList/> : <MovieList data={searchMovies} navigation={navigation}/> }
        </View>
        :
        <ScrollView
          contentContainerStyle={{
            alignItems: 'flex-start',
          }}>
          <View style={{flex:1, marginBottom: 20}}>
            <Text style={styles.titleText}>Top 10 Film oggi in Italia</Text>
            {trendingMovies.length <1 ? <SkeletonList/> :
            <MovieList data={trendingMovies} navigation={navigation}/>}
          </View>
          <View style={{flex:1, marginBottom: 20}}>
            <Text style={styles.titleText}>Cerca Film per genere</Text>
            <GenresList type='movie' navigation={navigation}/>
          </View>
          <View style={{flex:1}}>
            <Text style={styles.titleText}>Top 10 Serie TV oggi in Italia</Text>
            {trendingSeries.length<1 ? <SkeletonList/> : <MovieList data={trendingSeries} navigation={navigation}/>}
          </View>
          <View style={{flex:1, marginBottom: 20}}>
            <Text style={styles.titleText}>Cerca Serie TV per genere</Text>
            <GenresList type='tv' navigation={navigation}/>
          </View>
        </ScrollView>
        }
      </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: colors.dark,
  },
  titleText:{
    color: '#fff',
    marginHorizontal: 15,
    fontSize: 18,
    fontWeight:'bold',
  },
});

export default HomeScreen;
