import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Image,TextInput, Text, View } from 'react-native';
import { Credentials } from './components/Credentials'
import styles from './Styles.js'
import axios from 'axios'

export default function App() {
  const spotify = Credentials(); // pega meu client id e meu client secret// 
  const [token, setToken] = useState('');
  const [inputAlbum, setInputAlbum] = useState('')
  const [albumsList, setAlbumsList] = useState('')

   useEffect(() => {
    const fetchToken = async () => {
      const tokenResponse = await axios('https://accounts.spotify.com/api/token', {
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Authorization' : 'Basic ' + btoa(spotify.ClientId + ':' + spotify.ClientSecret)      
        },
        data: 'grant_type=client_credentials',
        method: 'POST'
      })
      setToken(tokenResponse.data.access_token);
    }

    fetchToken()
  },  [spotify.ClientId, spotify.ClientSecret]) // a cada vez que o client id ou o client secret mudar, será executado novamente //

  useEffect(() => {
    const fetchAlbums = async () => {
      console.log(token)
      const albumsResponse = await axios(`https://api.spotify.com/v1/search?q=${inputAlbum}&type=album&limit=10`, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token}
      })

      setAlbumsList(albumsResponse.data.albums.items);
      console.log(albumsList)
    }
    fetchAlbums()
  }, [token, inputAlbum])
  const Matheus = (props) => {
    return (
      <Text>Hello World !</Text>
    // <View  style={styles.album}>
    //   <View style={styles.caixaItem}> 
    //   <View style={styles.makeColumn}>
    //     <Text style={styles.texto3}>A  </Text>
    //     <Text style={styles.texto3}> Nome do  </Text>
    //     <Text style={styles.texto3}>Data de  </Text>
    //     <Text style={styles.texto3}>Número de  </Text>
    //     <Text style={styles.texto3}>Link do album no spotify: </Text> 
    //   </View></View></View>
    );
  }
  return (
    
    <View style={styles.container}>
      <Text style={styles.titulo}>Almostify</Text>
        <TextInput style={styles.input} value={inputAlbum} onChange={(e) => setInputAlbum(e.target.value)} placeholder="Digite o nome do album ou artista"/>
          <Text>Hello World! </Text>
          {/* {albumsList && albumsList.map(album => (
            <Matheus />
          ))}   */}
    </View>
 
);
}
