import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, Image, FlatList } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [tags, setTags] = useState([
    { name:'#intercambio', key: 1},
    { name:'#prestamo', key: 2},
    { name:'#regalo', key: 3},
  ]);

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../assets/images/adaptive-icon.png')} 
      />
      <Text style={styles.title}>Nombre Producto</Text>
      <Text style={styles.smallText}>Publicado por: @Usuario</Text>
      <FlatList 
        // tiene mucho espacio por alguna razón
        style={styles.flatlist}
        horizontal={true}
        data={tags}
        renderItem={({item}) => (
          <Text style={styles.tags}> {item.name} </Text>
         )}
      />
      <Text style={styles.mediumText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed viverra velit id nulla fringilla molestie quis ac diam. Nam porta.</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.mediumText}>Abrir chat con @Usuario</Text>
      <Text style={styles.mediumText}>Guardar en la lista</Text>
      <Text style={styles.mediumText}>Ubicación</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',

  },
  separator: {
    marginVertical: 15,
    height: 1,
    width: '80%',
  },
  flatlist: {
    height: 30,
    flexGrow: 0
  },
  tags: {
    backgroundColor: '#2f95dc',
    margin: 5,
    height: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  mediumText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginLeft: '10%',
    marginRight: '10%',
    textAlign: 'justify',
  },
  smallText: {
    color: '#333',
    fontSize: 13,
  },
  image: {
    width: 250,
    height: 250,
    margin: 10
  },
});
