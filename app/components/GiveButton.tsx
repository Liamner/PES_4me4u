import React, { Component } from "react";
import {StyleSheet, View , Text, TouchableOpacity, Pressable} from "react-native";
import { Modal, SafeAreaView, FlatList } from 'react-native';
import axios from 'axios'
import retrieveSession from '../hooks/retrieveSession'
import getProduct from "../hooks/getProduct";


const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2aed5-3ad53abb28ba',
    title: 'Bicicleta Montaña 27* hola que tal',
  },
  {
    id: 'bd7acbea-c11-46c2-aed5-3ad53abb28ba',
    title: 'Lavadora Bosch Secado Ultra Rapido',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28a',
    title: 'Ordenador Dell 8 GB de Ram intel core i29',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Biblia siglo XI',
  },
  {
    id: '58694a0f-3da1-471f-bd96-15571e29d72',
    title: 'Corta Cesped 8000 ultra corto',
  },
  {
    id: '58694a0f-3da1-471f-bd96-1455719d72',
    title: 'Silla de Ruedas Ultra LIgera resistente al agua',
  },
  {
    id: '58694a0f-3da1-471f-bd96-14455719d72',
    title: 'Muletas resistentes a 900 kg',
  },
];

export  function GiveButton  () {  
  console.log("GIVE BUTTON")
  
  const [modalVisible, setModalVisible] = React.useState(false);
  const [products, setProducts] = React.useState();
  const getProducts = async (product: String) => {    
    const sess = await retrieveSession();
    console.log("sesion id: " + sess.id)
    //61ba2a4f6bd96835a7895b33
    let response = await axios.get('https://app4me4u.herokuapp.com/api/user/'+sess.id+'/products');
    setProducts(response.data)
    console.log("respuesta" + response.data[0])
    setModalVisible(true)
    };
  // let response = await axios.get('https://app4me4u.herokuapp.com/api/tradeGive/create/user/61a2500c9b1c6cb5e2e0aa90/products');
    // console.log("get de porducts: " + response)
  const selectProduct = async (name: String, id:String) => {    
    console.log("PRODUCT NAME: " + name + "ID: " + id)
  await axios.post('https://app4me4u.herokuapp.com/api/tradeGive/create', {
      userOfering  : "61a2500c9b1c6cb5e2e0aa90",
      userTaking: "61a3855a5cd77458b48896ed",
      product  :id,
    }).then(function (response) {
      console.log("response: " + response.status);
    })
    .catch(function (error) {
      console.log("error" + error);
    });
    setModalVisible(false);
  };
  React.useEffect(() => {
   // getProducts("");
  }, []);
  const Item = ({ title, id }) => (
    <TouchableOpacity onPress = {() => selectProduct(title, id)}>
      <View style={styles.item}>      
        <Text style={styles.itemTitle}>{title}</Text>
        <View  style= {{height:1.5, backgroundColor:'#cacaca'}}/>
      </View>
    </TouchableOpacity>
  );
  const renderItem = ({ item }) => (
    <Item title={item.name} id = {item._id}/>
  );

  return (
    <>   
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
          <View style={styles.modalView}>
            <Text style={styles.question}>¿Que quieres regalar?</Text>
            <SafeAreaView>
              <FlatList
                data={products}
                renderItem={renderItem}
                keyExtractor={item => item._id}
              />
            </SafeAreaView>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text> Atrás</Text>
            </Pressable>
          </View>
      </Modal>     
    <Pressable style={[styles.button, {backgroundColor: '#a2cff0'}]} onPress ={() => getProducts("")} ><Text>Dar Producto!</Text></Pressable>
    </>
)

}
const styles = StyleSheet.create({
  
    modalView: {
      backgroundColor: "white",
      height: '100%',
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      margin : 10,
      borderRadius: 4,
      elevation: 3,
      width: '90%',    
      backgroundColor: '#a2cff0',
    },
    itemTitle: {
      fontSize: 22,
      color: 'black',
      padding: 10,    
      paddingLeft: 14,
      fontWeight: "bold"
    },  
    item: {
      backgroundColor: "#ffffff",
      borderColor:'black',
      marginVertical: 1
    },
    question: {
      fontSize: 26,
      color: 'black',
      marginTop: '2%',
      marginLeft: '3%',
      marginBottom: '3%',
      width: '90%',
      fontWeight: "bold"
    },  
  });
  

export default GiveButton;