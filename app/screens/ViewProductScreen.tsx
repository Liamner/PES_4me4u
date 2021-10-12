import { Entypo, Ionicons } from '@expo/vector-icons'; 
import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, Image, FlatList, TouchableHighlight} from 'react-native';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import Layout from '../constants/Layout';


export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [tags] = useState([
    { name:'#intercambio', key: 1},
    { name:'#prestamo', key: 2},
    { name:'#regalo', key: 3},
  ]);
  const [categories] = useState([
    { name:'Categoria 1', key: 1},
    { name:'Categoria 2', key: 2},
    { name:'Categoria 3', key: 3},
  ]);
  const [images] = useState([
    { link:'../assets/images/adaptive-icon.png', key: 1 },
    { link:'../assets/images/adaptive-icon.png', key: 2 },
    { link:'../assets/images/adaptive-icon.png', key: 3 },
    { link:'../assets/images/adaptive-icon.png', key: 4 },
    { link:'../assets/images/adaptive-icon.png', key: 5 },
    { link:'../assets/images/adaptive-icon.png', key: 6 },
  ]);
  const [currentPage, setCurrentPage] = useState(1);

  

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        renderItem={({ item }) => ( 
          <Image
            style={styles.image}
            source={require('../assets/images/adaptive-icon.png')}
          />
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
      />
      <Text>{`${currentPage} / ${images.length}`} </Text>
      <Text style={styles.title}>Nombre Producto</Text>
      <Text style={styles.smallText}>Publicado por: @Usuario</Text>
      <FlatList 
        style={styles.flatlist}
        horizontal={true}
        data={tags}
        renderItem={({item}) => (
          <Text style={styles.tags}> {item.name} </Text>
         )}
      />
      <FlatList 
        style={styles.flatlist}
        horizontal={true}
        data={categories}
        renderItem={({item}) => (
          <Text style={styles.tags}> {item.name} </Text>
         )}
      />
      <Text style={styles.mediumText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed viverra velit id nulla fringilla molestie quis ac diam. Nam porta.</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <TouchableHighlight style={styles.button} underlayColor={'#fff'} onPress={()=>console.log("boton chat pulsado")}>
        <View style={styles.row}>
          <Ionicons
            name="chatbox"
            size={24}
            color="#333"
          />
          <Text style={styles.normalText}>Abrir chat con @Usuario</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight style={styles.button} underlayColor={'#fff'} onPress={()=>console.log("boton guardar pulsado")}>
        <View style={styles.row}>
          <Entypo
            name="save"
            size={24}
            color="#333"
          />
          <Text style={styles.normalText}>Guardar en la lista</Text>
        </View>
      </TouchableHighlight>
      <View style={styles.row}>
        <Entypo
          name="location"
          size={24}
          color="#333"
        />
        <Text style={styles.normalText}>Ubicación</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  scroll: {
    backgroundColor: 'red',
  },
  separator: {
    marginVertical: 15,
    height: 1,
    width: '80%',
  },
  row: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginLeft: '10%',
    marginRight: '10%',
  },
  flatlist: {
    height: 30,
    flexGrow: 0
  },
  tags: {
    backgroundColor: '#a2cff0',
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
  normalText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginLeft: 10,
    textAlign: 'justify',
  },
  smallText: {
    color: '#333',
    fontSize: 13,
  },
  button: {
    alignSelf: 'flex-start',
  },
  image: {
    width: Layout.width,
    height: Layout.width,
    marginBottom: 10,
  },
});
