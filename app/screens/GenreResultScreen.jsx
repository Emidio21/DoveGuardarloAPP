import React, {
  useEffect,
  useState
} from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import MovieList from '../components/MovieList';
import SkeletonList from '../components/SkeletonList';

import colors from '../config/colors';

function GenreResultScreen({route, navigation}){
  const { id, name, type } = route.params;
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    try{
      const response = await fetch('https://api-filmchecker.herokuapp.com/genres/'+ type + '/'+ id);
      let movies = await response.json();
        setMovies([{key:'empty-left'} , ...movies, {key:'empty-right'}])
    } catch(e){
      console.log(e);
    }
  }

  useEffect(() => {
    getMovies();
  },[])


  return(
    <View style={styles.container}>
      <View style={{flex:1, marginBottom: 20}}>
        <Text style={styles.titleText}>{type==='movie' ? 'Film' : 'Serie TV'} in {name}</Text>
        {movies.length >0 ? <MovieList type={type} data={movies} navigation={navigation}/> : <SkeletonList/>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: colors.dark,
    flex: 1,
  },
  titleText:{
    color: '#fff',
    marginHorizontal: 15,
    fontSize: 18,
    fontWeight:'bold',
  },
});

export default GenreResultScreen;
