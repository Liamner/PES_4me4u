import * as React from 'react';
import { useState } from 'react';
import { ScrollView, StyleSheet, Modal, SafeAreaView, FlatList, Pressable, TouchableOpacity, Alert, PermissionsAndroid } from 'react-native';
import { RootTabScreenProps } from '../types';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import '../assets/i18n/i18n';

import ProductCard from '../components/ProductCard';
import MiniProductCard from '../components/MiniProductCard';
import NavigationBar from '../components/NavigationBar'
import retrieveSession from '../hooks/retrieveSession';
import { json } from 'express';
import { View, Text } from '../components/Themed';

interface ProductImage {
  __v: number;
  __id: string;
  public_id: string;
  url: string;
}
interface Product {
  __v: number;
  __id: string;
  description: string;
  img: ProductImage[];
  name: string;
  publishingDate: string;
  state: string;
  exchange: string[]
}
export default function FirstScreen({ navigation }: RootTabScreenProps<'FirstScreen'>) {

  const [products, setProducts] = React.useState();

  const { t, i18n } = useTranslation();
  const [currentLanguage, setLanguage] = useState('cat');

  const [noProduct, setNoProduct] = React.useState(false);
  const [recentlyViewedProducts, setRecentlyViewedProducts] = React.useState();
  const [isRecentlyViewedProducts, setIsRecentlyViewed] = React.useState(false);
  const [session, setSession] = React.useState({
    id: "",
    user: "",
    token: ""
  });

  const getData = async () => {
    try {
      const value = await retrieveSession()
      if (value !== null) {
        setSession(value)
        getRecentlyViewedProducts(value.id)
      }
      else {
        console.log("empty")
      }
    } catch (e) {
      console.log(e)
    }
    console.log(session)
  }

  const getRecentlyViewedProducts = async (userid) => {
    console.log('session:' + userid)
    const response = await axios.get('https://app4me4u.herokuapp.com/api/user/' + userid + '/productsRecentlyViewed');
    console.log(response.data)
    if (response.data.length != 0) {
      setIsRecentlyViewed(true)
      setRecentlyViewedProducts(response.data);
    }

  };

  const getProducts = async () => {
    const response = await axios.get('https://app4me4u.herokuapp.com/api/product');
    setProducts(response.data);
    if (response.data.length == 0) setNoProduct(true)
  };
  React.useEffect(() => {
    const willFocusSubscription = navigation.addListener('focus', () => {
      getData();
    getProducts();
    });

    return willFocusSubscription;
    
  }, []);

  const DATA = [
    {
      id: 'homeApplicances',
      title: t('Electrodomesticos'),
    },
    {
      id: 'videogames',
      title: t('Consolas y videojuegos'),
    },
    {
      id: 'movies',
      title: t('Cine, libros, m??sica'),
    },
    {
      id: 'children',
      title: t('Ni??os y beb??s'),
    },
    {
      id: 'construction',
      title: t('Construcci??n y reformas'),
    },
    {
      id: 'games',
      title: t('Juegos y juguetes'),
    },
  ];

  const Item = ({ title, id }) => (
    <TouchableOpacity onPress={() => setCategory(title, id)}>
      <View style={styles.item}>
        <Text style={styles.itemTitle}>{title}</Text>
        <View style={{ height: 1.5, backgroundColor: '#cacaca' }} />
      </View>
    </TouchableOpacity>
  );

  const [name, onChangeName] = React.useState("");
  const [modalVisible, setModalVisible] = React.useState(false);
  const setCategory = async (title: String, id: String) => {
    setModalVisible(false);
    navigation.navigate("ProductSearch", id)
    console.log("id: " + id)
  };

  const renderItem = ({ item }) => (
    <Item title={item.title} id={item.id} />
  );

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          //Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <SafeAreaView>
            <FlatList
              data={DATA}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          </SafeAreaView>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.textStyle}> {t('Atr??s...')}</Text>
          </Pressable>
        </View>
      </Modal>
      <ScrollView style={styles.scrollCategorias} horizontal={true} showsHorizontalScrollIndicator={false}>
        <TouchableOpacity onPress={() => navigation.navigate("ProductSearch", "fashion")}>
          <View style={styles.elementoCategoria}>
            <Icon name='shirt-outline' size={40} />
            <Text style={styles.textoCategoria}>{t('Moda')}</Text>
          </View>

        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("ProductSearch", "computer")}>
          <View style={styles.elementoCategoria}>
            <Icon name='laptop-outline' size={40} />
            <Text style={styles.textoCategoria}>{t('Inform??tica')}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("ProductSearch", "pets")}>
          <View style={styles.elementoCategoria}>
            <Icon name='paw-outline' size={40} />
            <Text style={styles.textoCategoria}>{t('Mascotas')}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("ProductSearch", "home")}>
          <View style={styles.elementoCategoria}>
            <Icon name='home-outline' size={40} />
            <Text style={styles.textoCategoria}>{t('Hogar')}</Text>
          </View>

        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("ProductSearch", "games")}>
          <View style={styles.elementoCategoria}>
            <Icon name='wine-outline' size={40} />
            <Text style={styles.textoCategoria}>{t('Ocio')}</Text>
          </View>

        </TouchableOpacity>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <View style={styles.elementoCategoria}>
            <Icon name='ellipsis-horizontal-outline' size={40} />
            <Text style={styles.textoCategoria}>{t('Otros')}</Text>
          </View>

        </TouchableOpacity>
      </ScrollView>
      <ScrollView style={{ marginBottom: 30, height: '100%', backgroundColor: 'white' }} showsVerticalScrollIndicator={false}>
        {isRecentlyViewedProducts &&
          <ScrollView style={{ backgroundColor: '#a2cff0' }}>
            <Text style={styles.noProductTitle}> {t('Visto Recientemente')}</Text>
            <FlatList
              numColumns={4}
              data={recentlyViewedProducts}
              renderItem={({ item }) => (
                <MiniProductCard id={item._id} navigation={navigation} name={item.name} arrayTratos={item.exchange} imageUri={item.img[0].url} uid={session.id} token={session.token} />
              )}
              keyExtractor={item => item._id}
            />
            <View style={styles.separator} />
          </ScrollView>}
        {noProduct && <Text style={styles.noProductTitle}> {t('No hay productos actualmente')}</Text>}
        {!noProduct && <FlatList
          numColumns={2}
          initialNumToRender={4}
          data={products}
          renderItem={({ item }) => (
            <ProductCard id={item._id} navigation={navigation} name={item.name} arrayTratos={item.exchange} imageUri={item.img[0].url} uid={session.id} token={session.token} />
          )}
          keyExtractor={item => item._id}
        />}
      </ScrollView>
      <NavigationBar navigation={navigation} casa={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noProductTitle: {
    color: 'white',
    backgroundColor: '#a2cff0',
    borderRadius: 8,
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 3,
    paddingVertical: 3,
    paddingHorizontal: 6
  },
  scrollCategorias: {
    borderColor: '#dfdfdf',
    borderWidth: 1,
    borderRadius: 7,
    width: '98%',
    height: 100,
    alignContent: 'space-between',
    margin: '1%'
  },
  navigator: {
    borderRadius: 5,
    height: 45,
    borderColor: '#5e5c57',
    borderWidth: 1,
    backgroundColor: '#e2e2e1',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  icono: {
    width: 35,
    height: 35,
  },
  iconoCategoria: {
    width: 40,
    height: 40,
    marginBottom: 2,
  },
  separator: {
    backgroundColor: '#a2cff0',
    height: 8,
    borderRadius: 5,
    marginVertical: 8
  },
  elementoCategoria: {
    width: 80,
    height: 120,
    alignItems: 'center',
    marginHorizontal: 3,
    marginTop: 8,
  },
  touchable: {
    width: '20%',
    borderRadius: 10,
    borderColor: 'green',
    alignItems: 'flex-start'
  },
  textoCategoria: {
    color: '#8d8c89',
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    color: 'black',
    marginTop: '2%',
    marginLeft: '5%',
    width: '90%',
  },
  itemTitle: {
    fontSize: 22,
    color: 'black',
    padding: 10,
    paddingLeft: 14,

  },
  notImage: {
    marginHorizontal: 5,
    width: 100,
    height: 100,
    borderRadius: 10,
    borderColor: '#5e5c57',
    borderWidth: 3,
    backgroundColor: '#F0F0F0',
  },
  modalView: {
    backgroundColor: "white",
    height: '100%',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    position: 'absolute',
    bottom: 15,
    left: 10,
    backgroundColor: '#a2cff0'
  },
  buttonClose: {
    backgroundColor: "#a2cff0",
  },
  item: {
    backgroundColor: "#ffffff",
    borderColor: 'black',
    marginVertical: 1
  },
});
