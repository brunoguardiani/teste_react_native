import React, { useState } from 'react'
import axios from 'axios'
import { StyleSheet, Image,TextInput, Text, View } from 'react-native';
import styles from  './Styles.js'


function Album({album, token}) {
  const [albumTracks, setAlbumTracks] = useState([])
  const [isTracksVisible, setIsTracksVisible] = useState(false)

  const album_aux = (props) => {
    return (
      <View style={styles.center}>
        <Text>Hello {props.name}!</Text>
      </View>
    );
  }

  const fetchTracks = async (id) => {
    const tracksResponse = await axios(`https://api.spotify.com/v1/albums/${id}/tracks`, {
      method: 'GET',
      headers: { 'Authorization' : 'Bearer ' + token}
    })

    const tracks = tracksResponse.data.items.map(track => ({name: track.name, duration: track.duration_ms, explicit: track.explicit, id: track.id})) // mapeia as tracks pegando nome, duração em ms e se é explicito //
    setAlbumTracks(tracks)
  }

  const handleShowTracks = (id) => {
    if (!isTracksVisible) fetchTracks(id) // se tracks nao for visivel, realiza fetchtracks //
    setIsTracksVisible(!isTracksVisible) // faz a inversão se istrackvisible for true vira false e se for false vira true //
  }

  return (
    <View style={styles.album}>
      <View style={styles.caixaItem}> 
        <View style={styles.makeColumn}>
          <Text style={styles.texto1}>A {album.artists[0].name} </Text>
          <Text style={styles.texto1}> Nome do  {album.name}</Text>
          <Text style={styles.texto1}>Data de  {album.release_date}</Text>
          <Text style={styles.texto1}>Número de  {album.total_tracks}</Text>
          <Text style={styles.texto1}>Link do album no spotify: {album.external_urls.spotify} {album.external_urls.spotify}</Text> 
         
        </View></View></View>
        )
}

export default Album