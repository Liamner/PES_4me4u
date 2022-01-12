import { Entypo, Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, Image, FlatList, TouchableHighlight, ScrollView } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import Layout from '../constants/Layout';
import { CustomMap, CustomMarker } from '../components/MapComponents';
import axios, { AxiosResponse } from 'axios';
import NavigationBar from '../components/NavigationBar'
import retrieveSession from '../hooks/retrieveSession';
import Icon from 'react-native-vector-icons/Ionicons';
import '../assets/i18n/i18n';
import { useTranslation } from 'react-i18next';

export default function ViewProduct({ navigation, route }: RootTabScreenProps<'ViewProduct'>) {
  const uid = '61d1ebbfaa8e09aa5f530d5e';

  const pid = route.params.pid;
  //Variables de las respuestas API
  const [user, setUser] = useState('@Usuario');
  const [userid, setUserID] = useState('');
  const [latitude, setLatitude] = useState(undefined);
  const [longitude, setLongitude] = useState(undefined);

  const { t, i18n } = useTranslation();

  //Variables de la vista
  const [state, setState] = useState('Cargando');
  const [images, setImages] = useState([{
    "_id": "errorerrorerrorerro",
    "public_id": "errorerrorerrorerror",
    "url": "https://www.nosolohacking.info/wp-content/uploads/2017/11/error2.jpg",
    "__v": 0
  }]);
  const [hasImages, SetHasImages] = useState(false);


  const [currentPage, setCurrentPage] = useState(1);
  const [name, setName] = useState('Cargando...')
  //nombre usuario
  const [exchange] = useState([{ name: 'Cargando...', key: '10' }]);
  const [categories, setCategories] = useState([{ name: 'Cargando...', key: '10' }]);
  const [description, setDescription] = useState('Cargando...');

  const [ownProduct, setOwnProduct] = React.useState(false)

  const getData = async () => {
    try {
      const value = await retrieveSession()
      if (value !== null) {
        setSession(value)
        console.log('user: ' + user)
        if (user == value.id) {
          setOwnProduct(true);
          console.log(ownProduct)
        }
        getProductInfo(value.token);
        console.log("TOKENNNNN" + value.token);
      }
      else {
        console.log("empty")
      }
    } catch (e) {
      console.log(e)
    }
  }

  const [ownProfile, setOwnProfile] = useState(true);
  const [session, setSession] = React.useState({
    id: "",
    user:"",
    token:""
  });


  const Scroll = (event: { nativeEvent: { layoutMeasurement: { width: any; }; contentOffset: { x: any; }; }; }) => {
    const width = event.nativeEvent.layoutMeasurement.width;
    const contentOffset = event.nativeEvent.contentOffset.x;

    const currentNumber = Math.floor((contentOffset + 1) / width) + 1;
    setCurrentPage(currentNumber);
  };

  const getCorrectCategoriesType = (response: AxiosResponse) => {
    categories.pop();
    let aux = response.data.categories;
    switch (aux) {
      case "fashion":
        setCategories([{ name: t('Moda'), key: '1' }])
        break;
      case "computer":
        setCategories([{ name: t('Informática'), key: '2' }])
        break;
      case "homeApplicances":
        setCategories([{ name: t('Electrodomesticos'), key: '3' }])
        break;
      case "sports":
        setCategories([{ name: t('Ocio'), key: '4' }])
        break;
      case "home":
        setCategories([{ name: t('Hogar'), key: '5' }])
        break;
      case "videogames":
        setCategories([{ name: t('Consolas y videojuegos'), key: '6' }])
        break;
      case "movies":
        setCategories([{ name: t('Cine, libros, música'), key: '7' }])
        break;
      case "children":
        setCategories([{ name: t('Niños y bebés'), key: '8' }])
        break;
      case "contruction":
        setCategories([{ name: t('Construcción y reformas'), key: '9' }])
        break;
      case "pets":
        setCategories([{ name: t('Mascotas'), key: '10' }])
        break;
      case "games":
        setCategories([{ name: t('Juegos y juguetes'), key: '11' }])
        break;
      case "other":
        setCategories([{ name: t('Otros'), key: '12' }])
        break;
      default:
        setCategories([{ name: 'GATITOS', key: '0' }])
        break;
    }
  }


  const getCorrectExchangeType = (response: AxiosResponse) => {
    exchange.pop();
    let aux = response.data.exchange;
    aux.forEach(element => {
      switch (element) {
        case "exchange":
          exchange.push({ name: t('#intercambio'), key: '1' })
          break;
        case "provide":
          exchange.push({ name: t('#préstamo'), key: '2' })
          break;
        case "present":
          exchange.push({ name: '#regalo', key: '3' })
          break;
        default:
          exchange.push({ name: 'Perritos frios', key: '0' })
          break;
      }
    }
    );

  }

  const getCorrectStateType = (response: AxiosResponse) => {
    switch (response.data.state) {
      case "available":
        setState("Disponible");
        break;
      case "reserved":
        setState(t("Reservado"));
        break;
      case "provide":
        setState(t("Prestado"));
        break;
      default:
        break;
    }
  }

  const openChat = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${session.token}`
      }
    }
    await axios.post('https://app4me4u.herokuapp.com/api/conversation', {
      reciverId: userid,
      productId: pid
    }, config).then(function (response) {
      console.log(response);
      navigation.navigate('ChatView', {
        id: response._id,
        productId: pid,
        productName: name,
        productImg: images[0].url
      })
    })
      .catch(function (error) {
        console.log(error);
      });
  }

  const saveProduct = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${session.token}`
      }
    }
    await axios.put('https://app4me4u.herokuapp.com/api/user/' + session.id + '/AddToWishlist', {
      idProduct: pid
    }, config).then(function (response) {
      console.log(response);
    })
      .catch(function (error) {
        console.log(error);
      });

  }


  const getProductInfo = async (token) => {

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    let response = await axios.get('https://app4me4u.herokuapp.com/api/product/' + pid, config);
    //Required
    setName(response.data.name);
    getCorrectCategoriesType(response);
    getCorrectExchangeType(response);
    getCorrectStateType(response);
    setUserID(response.data.userId);
    setUser(response.data.username);
    console.log(response.data)

    //Optional
    if (response.data.description == null) setDescription(t('El usuario no nos ha dado una descripción...'));
    else setDescription(response.data.description);

    if (response.data.img == null) {
      SetHasImages(false);
      setImages([{
        "_id": "",
        "public_id": "",
        "url": "",
        "__v": -1
      }]);
    }
    else {
      SetHasImages(true);
      setImages(response.data.img);
    }
    //getData(response.data.userId);
    getUserInfo(response.data.userId);
    //let response2 = await axios.put('https://app4me4u.herokuapp.com/api/user/'+ response.data.userId +'/addProductsRecentlyViewed', {
    //  idProduct: pid,
    //})

  };

  const getUserInfo = async (userId) => {
    let response = await axios.get('https://app4me4u.herokuapp.com/api/user/' + userId);
    //Required
    setUser(response.data.userId);
    setLatitude(response.data.latitude);
    setLongitude(response.data.longitude);
  };

  React.useEffect(() => {
    const willFocusSubscription = navigation.addListener('focus', () => {
      getData();
    });

    return willFocusSubscription;
  }, []);


  return (
    <View style={styles.container}>
      <ScrollView style={{ marginBottom: 45 }}>
        {hasImages ?
          <FlatList
            data={images} //ZZZ
            renderItem={({ item }) => (
              <Image
                style={styles.image}
                source={{ uri: item.url }}
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
          <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>{`${state}`}</Text>
        </View>
        {hasImages ?
          <Text style={styles.smallText}>{`${currentPage} / ${images.length}`} </Text>
          :
          null
        }

        <Text style={styles.title}>{`${name}`}</Text>
        <Text style={styles.smallText} onPress={() => navigation.navigate("OtherUserRead", userid)}>{t('Publicado por: ')}{`${user}`}</Text>
        <FlatList
          style={styles.flatlist}
          horizontal={true}
          data={exchange}
          renderItem={({ item }) => (
            <Text style={styles.tags}>{item.name}</Text>
          )}
        />
        <FlatList
          style={styles.flatlist}
          horizontal={true}
          data={categories}
          renderItem={({ item }) => (
            <Text style={styles.tags}>{item.name}</Text>
          )}
        />
        <Text style={styles.mediumText}>{`${description}`}</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        {ownProduct ?
          <>
            <TouchableHighlight style={styles.button} underlayColor={'#fff'} onPress={() => navigation.navigate('EditProduct', pid)}>
              <View style={styles.row}>
                <Icon name='pencil' size={24} color={'#333'} />
                <Text style={styles.normalText}>{t('Editar producto')}</Text>
              </View>
            </TouchableHighlight>
          </>
          :
          <>
            <TouchableHighlight style={styles.button} underlayColor={'#fff'} onPress={openChat}>
              <View style={styles.row}>
                <Icon name='chatbubble' size={24} color={'#333'} />
                <Text style={styles.normalText}>{t('Abrir chat con el usuario')}</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight style={styles.button} underlayColor={'#fff'} onPress={saveProduct}>
              <View style={styles.row}>
                <Icon name='bookmark' size={24} color={'#333'} />
                <Text style={styles.normalText}>{t('Guardar en la lista')}</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight style={styles.button} underlayColor={'#fff'}  onPress={() => {navigation.navigate("ReportProduct", {
              prodId: pid,
              userId: userid
             })}}>

          <View style={styles.row}>
            <Entypo
              name="save"
              size={24}
              color="#333"
            />
            <Text style={styles.normalText}>{t('Denunciar producto')}</Text>
          </View>
          </TouchableHighlight>
          </>
        }

        
        {latitude === undefined ?
          <>
            <View style={styles.row}>
              <Icon name='compass' size={24} color={'#333'} />
              <Text style={styles.normalText}>{t('Ubicación')}</Text>
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
          </>
          :
          <></>
        }
      </ScrollView>
      <NavigationBar navigation={navigation} casa={true} />
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


