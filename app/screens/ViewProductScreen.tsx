import { Entypo, Ionicons } from '@expo/vector-icons'; 
import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, Image, FlatList, TouchableHighlight, ScrollView } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import Layout from '../constants/Layout';
import { CustomMap, CustomMarker} from '../components/MapComponents';
import axios, { AxiosResponse } from 'axios';

export default function ViewProduct({ navigation }: RootTabScreenProps<'ViewProduct'>) {
  //Variables de las respuestas API
  const [user] = useState('@Usuario');

  //Variables de la vista
  const [state, setState] = useState('Cargando');
  // const [images, setImages] = useState([{"_id": "619e6fd640d15287ffe42acf",
  //       "public_id": "euwym4l6yabpe5zeocdk",
  //       "url": "http://res.cloudinary.com/dcg9pwql1/image/upload/v1637773267/euwym4l6yabpe5zeocdk.png",
  //       "__v": 0}]);

  const [images, setImages] = useState([{"_id": "errorerrorerrorerro",
  "public_id": "errorerrorerrorerror",
  "url": "https://www.nosolohacking.info/wp-content/uploads/2017/11/error2.jpg",
  "__v": 0}]);
        
  
  const [currentPage, setCurrentPage] = useState(1);
  const [name, setName] = useState('Cargando...') 
  //nombre usuario
  const [exchange] = useState([{name: 'Cargando...', key: '10'}]);
  const [categories, setCategories] = useState({name: 'Cargando...', key: '10'});
  const [description, setDescription] = useState('Cargando...')

//  const [imagenDePrueba, setImagenDePrueba] = useState('https://images-na.ssl-images-amazon.com/images/I/919WJsLPqUL.jpg') 


  const Scroll = (event: { nativeEvent: { layoutMeasurement: { width: any; }; contentOffset: { x: any; }; }; }) => {
    const width = event.nativeEvent.layoutMeasurement.width;
    const contentOffset = event.nativeEvent.contentOffset.x;

    const currentNumber = Math.floor((contentOffset + 1) / width) + 1;
    setCurrentPage(currentNumber);
  };

  const getCorrectCategoriesType = (response: AxiosResponse) => {
    let aux = response.data.categories;
//    aux.forEach((element: any) => {
      element: 
      switch (aux) {
        case "61797e24b4a4d195aa14be8d":
          setCategories({name: 'Tecnologia', key: '1'})
          break;
        case "61940e6f0c77883d581cede8":
          setCategories({name: 'Jugetes', key: '2'})
          break;
        default:
          setCategories({name: 'GATITOS', key: '0'})
          break;
      }
//    });
  }


  const getCorrectExchangeType = (response: AxiosResponse) => {
    exchange.pop();
    let aux = response.data.exchange;
//    aux.forEach((element: any) => {
      switch (aux) {
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
          exchange.push({ name:'Perritos frios', key: '0'})
          break;
      }
//    });
  }

  const getCorrectStateType = (response: AxiosResponse) => {
    switch (response.data.state) {
      case "available":
        setState("Disponible");
        break;
      case "reserved":
        setState("Reservado");
        break;
      case "provide":
        setState("Prestado");
        break;
      default:
        break;
    }
  }


  const getProductInfo = async () => {
    
    let response = await axios.get("https://app4me4u.herokuapp.com/api/product/619e6fd140d15287ffe42aca");
    //Required
    setName(response.data.name);
    getCorrectCategoriesType(response);
    getCorrectExchangeType(response);
    getCorrectStateType(response);
    //images

    //Optional
    if(response.data.description == null) setDescription('Descripción: El usuario no nos ha dado una descripción...');
    else setDescription("Descripción: " + response.data.description);

    setImages(response.data.img)
    //getProductImages();

  };

  const getProductImages = async () => {
    let response = await axios.get('https://app4me4u.herokuapp.com/api/image/619e6fd140d15287ffe42aca');
    //Required
    setName(response.data.name);
//    setImagenDePrueba(response.data.img)
    //images

    //Optional
    if(response.data.description == null) setDescription('El usuario no nos ha dado una descripción...');
    else setDescription(response.data.description);
  };




  getProductInfo()
//  getProductImages()

  
  return (
    <View style={styles.container}>
      <ScrollView>
        <FlatList
          data={images} //ZZZ
          renderItem={({ item }) => ( 
            <Image
              style={styles.image}
              source={{uri: item.url}}
            />
          )}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          onMomentumScrollEnd={Scroll}
        />
        <View style={styles.state}>
          <Text style={{color: 'white'}}>{`${state}`}</Text>
        </View>
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
  state: {
    alignSelf: 'stretch',
    padding: 5,
    margin: 5,
    backgroundColor: 'rgba(76,76,76, 0.8)',
    position: 'absolute',
    borderRadius: 10,
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


