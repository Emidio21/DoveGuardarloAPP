import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { withBadge } from 'react-native-elements'

import colors from '../config/colors';

const windowWidth = Dimensions.get('window').width;

function DetailsScreen({ route, navigation }){
  const { id, type } = route.params;
  const [movieData, setMovieData] = useState({});

  const getMovieInfo = async () => {
    try{
      const response = await fetch('https://api-filmchecker.herokuapp.com/movie_info/'+type +'/' + id)
      const data = await response.json();
      setMovieData(data.filmData)
    }catch(e){
      console.log(e);
    }
  }

  useEffect(() => {
    getMovieInfo()
  },[id])

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        alignItems: 'flex-start',
        alignItems: 'center',
      }}>
      <Image source={{
        uri: 'https://image.tmdb.org/t/p/w780'+movieData?.backdrop_path
      }}
      style={styles.backImage}/>
      <View style={styles.dataContainer}>
        <Text style={[styles.text, styles.title]}>{movieData?.title || movieData?.name}</Text>
        <Text style={styles.text}>[
          { movieData?.genres?.map(genre => ' ' + genre.name + ' ')}
        ]</Text>

        <View style={styles.vote}>
          <Text style={styles.text}>Vote: </Text>
          <Text style={[styles.text, styles.voteText]}>{movieData?.vote_average}/10</Text>
          <Text style={[styles.text,{fontWeight:'bold'}]}> [{movieData?.vote_count} voti]</Text>
          <Text style={[styles.text, styles.release]}> {movieData?.release_date}</Text>
        </View>

        <Text style={[styles.text, {fontStyle:'italic', marginHorizontal: 10}]}>{movieData?.overview}</Text>

        <Text style={[styles.text, {fontWeight: 'bold',fontSize: 18, margin: 15, alignSelf: 'flex-start', textAlign:'left'}]}>
        {
          movieData["watch/providers"]?.results['IT']?.flatrate || movieData["watch/providers"]?.results['IT']?.ads ? 'In Italia disponibile su:' : 'Non disponibile in streaming in Italia'
        }
        </Text>
        <View style={styles.providersContainer}>
        {movieData["watch/providers"]?.results['IT']?.flatrate?.map( provider => {
          return <Image
            key={provider.provider_id}
            source={{
              uri: 'https://image.tmdb.org/t/p/w92'+provider.logo_path
            }}
            style={styles.providerLogo}/>
        })}
        {movieData["watch/providers"]?.results['IT']?.ads?.map( provider => {
           const BadgedImage = withBadge('ads', {status:'warning', left:15, top:-4, badgeStyle:{backgroundColor:colors.primary, borderRadius: 5, borderColor:'none'}, textStyle:{fontSize: 10}})(Image)
           return <BadgedImage
            key={provider.provider_id}
            source={{
              uri: 'https://image.tmdb.org/t/p/w92'+provider.logo_path
            }}
            style={styles.providerLogo}/>
        })}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  backImage:{
    width: '100%',
    height: 300,
  },
  container:{
    backgroundColor: colors.dark
  },
  dataContainer:{
    flex:1,
    width:'100%',
    marginTop: -10,
    paddingTop: 25,
    borderTopLeftRadius:15,
    borderTopRightRadius:15,
    backgroundColor: colors.dark,
    alignItems: 'center',
  },
  providersContainer:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginHorizontal:3,
    width: '100%'
  },
  providerLogo:{
    width: 45,
    height: 45,
    marginHorizontal: 7,
    marginBottom: 10,
  },
  providerType:{
    color: '#fff',
    textAlign: 'left'
  },
  release:{
    marginLeft: 70
  },
  text:{
    color: '#fff',
    textAlign: 'center'
  },
  title:{
    fontWeight: 'bold',
    fontSize: 24
  },
  vote:{
    marginVertical: 20,
    paddingHorizontal: 15,
    flexDirection: 'row',
    width:'100%'
  },
  voteText:{
    fontStyle: 'italic'
  }
});

export default DetailsScreen;
