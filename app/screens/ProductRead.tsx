import { Entypo, Ionicons } from '@expo/vector-icons'; 
import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, Image, FlatList, TouchableHighlight, ScrollView, GestureResponderEvent } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import Layout from '../constants/Layout';
import { CustomMap, CustomMarker} from '../components/MapComponents';
import axios, { AxiosResponse } from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function ViewProduct({ navigation }: RootTabScreenProps<'ViewProduct'>) {
  const uid = '61b09c0f9482049de40b74f3';
  const pid = '61b64a52d4851901d035ed57';
  //Variables de las respuestas API
  const [user, setUser] = useState('@Usuario');
  const [userid, setUserID] = useState('');
  const [latitude, setLatitude] = useState(0.0);
  const [longitude, setLongitude] = useState(0.0);

  //Variables de la vista
  const [state, setState] = useState('Cargando');
  const [images, setImages] = useState([{"_id": "errorerrorerrorerro",
  "public_id": "errorerrorerrorerror",
  "url": "https://www.nosolohacking.info/wp-content/uploads/2017/11/error2.jpg",
  "__v": 0}]);
  const [hasImages, SetHasImages] = useState(false);
        
  
  const [currentPage, setCurrentPage] = useState(1);
  const [name, setName] = useState('Cargando...') 
  //nombre usuario
  const [exchange] = useState([{name: 'Cargando...', key: '10'}]);
  const [categories, setCategories] = useState([{name: 'Cargando...', key: '10'}]);
  const [description, setDescription] = useState('Cargando...')


  const Scroll = (event: { nativeEvent: { layoutMeasurement: { width: any; }; contentOffset: { x: any; }; }; }) => {
    const width = event.nativeEvent.layoutMeasurement.width;
    const contentOffset = event.nativeEvent.contentOffset.x;

    const currentNumber = Math.floor((contentOffset + 1) / width) + 1;
    setCurrentPage(currentNumber);
  };

  const getCorrectCategoriesType = (response: AxiosResponse) => {
    /*categories.pop();
    let aux = response.data.categories;
      element: 
      switch (aux) {
        case "61797e24b4a4d195aa14be8d":
          setCategories([{name: 'Tecnologia', key: '1'}])
          break;
        case "61940e6f0c77883d581cede8":
          setCategories([{name: 'Jugetes', key: '2'}])
          break;
        default:
          setCategories([{name: 'GATITOS', key: '0'}])
          break;
      }
    });*/
  }


  const getCorrectExchangeType = (response: AxiosResponse) => {
  /*  exchange.pop();
    let aux = response.data.exchange;
      switch (aux) {
        case "exchange":
          exchange.push({ name:'#intercambio', key: '1'})
          break;
        case "provide":
          exchange.push({ name:'#prestamo', key: '2'})
          break;
          case "6193a583e47e769eeaa7a978":
        //case "present":
          exchange.push({ name:'#regalo', key: '3'})
          break;
        default:
          exchange.push({ name:'Perritos frios', key: '0'})
          break;
      }
    });*/
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

  const saveProduct = async () => {
    await axios.post('https://app4me4u.herokuapp.com/api/user/'+uid+'/AddToWishlist', {
      idProduct: pid
    }).then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });
    
  }


  const getProductInfo = async () => {

    let response = await axios.get('https://app4me4u.herokuapp.com/api/product/'+pid);
    //Required
    setName(response.data.name);
    getCorrectCategoriesType(response);
    getCorrectExchangeType(response);
    getCorrectStateType(response);
    setUserID(response.data.userId);
    setUser(response.data.username);
    //images

    // //Optional
    // if(response.data.description == null) setDescription('El usuario no nos ha dado una descripción...');
    // else setDescription(response.data.description);
    //Optional
    if(response.data.description == null) setDescription('Descripción: El usuario no nos ha dado una descripción...');
    else setDescription("Descripción: " + response.data.description);
    
    if (response.data.img == null){
      SetHasImages(false);
      setImages([{"_id": "",
      "public_id": "",
      "url": "",
      "__v": -1 }]);
    }
    else {
      SetHasImages(true);
      setImages(response.data.img);
    }

  };

  const getUserInfo = async () => {
    let response = await axios.get('https://app4me4u.herokuapp.com/api/user/'+ userid);
    //Required
    //setUser(response.data.userId);
    setLatitude(response.data.latitude);
    setLongitude(response.data.longitude);
    console.log(userid)
  };

  
  React.useEffect(() => {
    getProductInfo();
  }, []);  

  
  getUserInfo();


  return (
    <View style={styles.container}>
      <ScrollView>
      { hasImages ?
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
        :
        null
      }
        <View style={styles.state}>
          <Text style={{color: 'white'}}>{`${state}`}</Text>
        </View>
        { hasImages ?
          <Text style={styles.smallText}>{`${currentPage} / ${images.length}`} </Text>
          :
          null
        }
        
        <Text style={styles.title}>{`${name}`}</Text>
        <Text style={styles.smallText}  onPress={() => navigation.navigate("UserRead", userid)}>Publicado por: {`${user}`}</Text>
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
        <TouchableHighlight style={styles.button} underlayColor={'#fff'} onPress={saveProduct}>
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
            latitude: latitude,
            longitude: longitude,
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


