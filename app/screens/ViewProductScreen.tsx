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
  //Variables de las respuestas API
  const [product, setProduct] = useState({});
  const [user, setUser] = useState('@Usuario')

  //Variables de la vista
  const [state, setState] = useState('Cargando')
  const [images] = useState([
    { link: 'https://images-na.ssl-images-amazon.com/images/I/919WJsLPqUL.jpg', key: '1' },
    { link: 'https://images-na.ssl-images-amazon.com/images/I/919WJsLPqUL.jpg', key: '2' },
    { link: 'https://images-na.ssl-images-amazon.com/images/I/919WJsLPqUL.jpg', key: '3' },
    { link: 'https://images-na.ssl-images-amazon.com/images/I/919WJsLPqUL.jpg', key: '4' },
    { link: 'https://images-na.ssl-images-amazon.com/images/I/919WJsLPqUL.jpg', key: '5' },
    { link: 'https://images-na.ssl-images-amazon.com/images/I/919WJsLPqUL.jpg', key: '6' },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [name, setName] = useState('Cargando...') 
  //nombre usuario
  const [exchange] = useState([{name: 'Cargando...', key: '10'}]);
  const [categories] = useState([{name: 'Cargando...', key: '10'}]);
  const [description, setDescription] = useState('Cargando...')

  const Scroll = (event: { nativeEvent: { layoutMeasurement: { width: any; }; contentOffset: { x: any; }; }; }) => {
    const width = event.nativeEvent.layoutMeasurement.width;
    const contentOffset = event.nativeEvent.contentOffset.x;

    const currentNumber = Math.floor((contentOffset + 1) / width) + 1;
    setCurrentPage(currentNumber);
  };

  const setUserInfo = () => {
    //Required
    //nombre usuario
    //ubicacion
  }

  const getUserInfo = async () => {
    axios.get('https://app4me4u.herokuapp.com/api/product/61645afb7f09d55d235f9c83')
    .then(response => {
        setUser(response.data as {});
        setUserInfo();
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  const getCorrectCategoriesType = () => {
    categories.pop();
    const aux = product.categories;
    for(let i of aux) {
      switch (i) {
        case "tech":
          categories.push({name: 'Tecnologia', key: '1'})
          break;
        case "house":
          categories.push({name: 'Cosas de casa', key: '2'})
          break;
        default:
          break;
      }
    }
  }

  const getCorrectExchangeType = () => {
    exchange.pop();
    const aux2 = product.exchange;
    for(let i of aux2) {
      switch (i) {
        case "exchange":
          exchange.push({ name:'#intercambio', key: '1'})
          break;
        case "provide":
          exchange.push({ name:'#prestamo', key: '2'})
          break;
        case "present":
          exchange.push({ name:'#regalo', key: '3'})
          break;
        default:
          break;
      }
    }
  }

  const setProductInfo = () => {
    //Required
    setName(product.name);
    getCorrectCategoriesType();
    getCorrectExchangeType();
    //images
    //https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png

    //Optional
    if(product.description == null) setDescription('El usuario no nos ha dado una descripción...');
    else setDescription(product.description)
  }

  const getProductInfo = async () => {
    await axios.get('https://app4me4u.herokuapp.com/api/product/61645afb7f09d55d235f9c83')
    .then(response => {
        setProduct(response.data as {});
        setProductInfo();
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
          data={exchange}
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
