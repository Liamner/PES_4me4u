import { Entypo, Ionicons } from '@expo/vector-icons'; 
import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, Image, FlatList, TouchableHighlight, ScrollView } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import Layout from '../constants/Layout';
import { CustomMap, CustomMarker} from '../components/MapComponents';
import axios from 'axios';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [name, setName] = useState('Nombre Producto');
  const [user] = useState('@Usuario')
  const [tags, setTags] = useState([
    { name:'#intercambio', key: '1'},
    { name:'#prestamo', key: '2'},
    { name:'#regalo', key: '3'},
  ]);
  const [categories, setCategories] = useState([
    { name:'Categoria 1', key: '1'},
    { name:'Categoria 2', key: '2'},
    { name:'Categoria 3', key: '3'},
  ]);
  const [images] = useState([
    { link: 'https://images-na.ssl-images-amazon.com/images/I/919WJsLPqUL.jpg', key: '1' },
    { link: 'https://images-na.ssl-images-amazon.com/images/I/919WJsLPqUL.jpg', key: '2' },
    { link: 'https://images-na.ssl-images-amazon.com/images/I/919WJsLPqUL.jpg', key: '3' },
    { link: 'https://images-na.ssl-images-amazon.com/images/I/919WJsLPqUL.jpg', key: '4' },
    { link: 'https://images-na.ssl-images-amazon.com/images/I/919WJsLPqUL.jpg', key: '5' },
    { link: 'https://images-na.ssl-images-amazon.com/images/I/919WJsLPqUL.jpg', key: '6' },
  ]);
  const [description, setDescription] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed viverra velit id nulla fringilla molestie quis ac diam. Nam porta.')
  const [currentPage, setCurrentPage] = useState(1);

  const Scroll = (event: { nativeEvent: { layoutMeasurement: { width: any; }; contentOffset: { x: any; }; }; }) => {
    const width = event.nativeEvent.layoutMeasurement.width;
    const contentOffset = event.nativeEvent.contentOffset.x;

    const currentNumber = Math.floor((contentOffset + 1) / width) + 1;
    setCurrentPage(currentNumber);
  };

  const getProductInfo = async () => {
    axios.get('https://app4me4u.herokuapp.com/api/product/61645afb7f09d55d235f9c83')
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <FlatList
          data={images}
          renderItem={({ item }) => ( 
            <Image
              style={styles.image}
              source={{uri: item.link}}
            />
          )}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          onMomentumScrollEnd={Scroll}
        />
        <Text style={styles.smallText}>{`${currentPage} / ${images.length}`} </Text>
        <Text style={styles.title}>{`${name}`}</Text>
        <Text style={styles.smallText}>Publicado por: {`${user}`}</Text>
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
        <Text style={styles.mediumText}>{`${description}`}</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <TouchableHighlight style={styles.button} underlayColor={'#fff'} onPress={/*()=>console.log("boton chat pulsado")*/getProductInfo}>
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
        <CustomMap
          style={styles.mapview}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <CustomMarker
            coordinate={{
              latitude: 37.78825,
              longitude: -122.4324,
            }}
          ></CustomMarker>
        </CustomMap>
      </ScrollView>
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
    marginHorizontal: '10%',
    marginVertical: 5,
  },
  flatlist: {
    height: 27,
    flexGrow: 0,
    alignSelf: 'center'
  },
  tags: {
    backgroundColor: '#a2cff0',
    margin: 5,
    height: '100%',
    fontSize: 13,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center'
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
    alignSelf: 'center'
  },
  button: {
    alignSelf: 'flex-start',
  },
  image: {
    width: Layout.width,
    height: Layout.width,
    marginBottom: 10,
  },
  mapview: {
    width: '80%',
    height: Layout.width - 175,
    alignSelf: 'center',
    marginTop: 5,
    marginBottom: 20,
  }
});
