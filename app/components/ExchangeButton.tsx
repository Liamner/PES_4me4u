import React, { Component } from "react";
import {Alert, Button, StyleSheet, View , Text, Image, TouchableOpacity, Pressable} from "react-native";
import { Platform, ScrollView, Modal, SafeAreaView, SectionList, StatusBar, Dimensions, FlatList } from 'react-native';
import axios from 'axios'
import navigation from "../navigation";
import retrieveSession from '../hooks/retrieveSession'
import DateTimePicker from '@react-native-community/datetimepicker';

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
const DATAaux = [
  {
    id: 'bd7acbea-c1b1-46c2aed5-3ad53abb28ba',
    title: 'Moto Playera 32*',
  },
  {
    id: 'bd7acbea-c11-46c2-aed5-3ad53abb28ba',
    title: 'Secadora Sony Secado Ultra Lento',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28a',
    title: 'Ordenador Samsung 87 MB de Ram intel core i29',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Quijote de la manxa edicion 99',
  },
  {
    id: '58694a0f-3da1-471f-bd96-15571e29d72',
    title: 'Corta Cesped 8000 ultra corto',
  },
  {
    id: '58694a0f-3da1-471f-bd96-1455719d72',
    title: 'Silla de Ruedas Ultra Pesada NO-resistente al agua',
  },
  {
    id: '58694a0f-3da1-471f-bd96-14455719d72',
    title: 'Muletas resistentes a 900 kg',
  },
];

export function ExchangeButton  () {   
  const [modalVisible, setModalVisible] = React.useState(false);
  const [firstProductSelected, setFirstProductSelected] = React.useState(false);
  const [secondProductSelected, setSecondProductSelected] = React.useState(false);
  const[selfProducts,  setSelfProducts] =  React.useState("");
  const[otherProducts,  setOtherProducts] =  React.useState("");
  const[secondProductName,  setSecondProductName] =  React.useState("");
  const[firstProductName,  setFirstProductName] =  React.useState("");
  const[firstProductId,  setFirstProductId] =  React.useState("");
  const[secondProductId,  setSecondProductId] =  React.useState("");
  
  const cancel = () => {
    setFirstProductSelected(false);
    setModalVisible(false);
  };

  const selectProduct = async (productId: string, productName: string) => {    

    if(firstProductSelected){
      setSecondProductId(productId)
      setSecondProductName(productName)
      console.log("PRIMER ID:" + firstProductId + "SECOND ID: " + secondProductId)
      console.log("PRIMER NAME:" + firstProductName + "SECOND NAME: " + secondProductName)

      let response = await axios.post('https://app4me4u.herokuapp.com/api/tradeExchange/create', {
        userOfering  : "61a2500c9b1c6cb5e2e0aa90",
        userTaking: "61a3855a5cd77458b48896ed",
        productOfering   :"61a68d86d32c5e541ab70a14",
        productTaking: "61a68d80d32c5e541ab70a0e",
       }).then(function (response) {
         console.log("response: " + response.status);
       })
       .catch(function (error) {
         console.log("error" + error);
       });
    
       setModalVisible(false);
      //usar product cuando se trata del segundo
      //TODO descomentar/comentar abajo para hacer tests
      setFirstProductSelected(false)
    }
    else{
      setFirstProductId(productId)
      setFirstProductName(productName)
      setFirstProductSelected(true)
      let response = await axios.get('https://app4me4u.herokuapp.com/api/user/61bb8086b748e8cb515b798f/products');
      setOtherProducts(response.data)     
    }
  };
  
  const Item = ({ title, id}) => (
    <TouchableOpacity onPress = {() => selectProduct(id, title)}>
      <View style={styles.item}>      
        <Text style={styles.itemTitle}>{title}</Text>
        <View  style= {{height:1.5, backgroundColor:'#cacaca'}}/>
      </View>
    </TouchableOpacity>
  );
  const exchangeProduct = async () => {     
    const sess = await retrieveSession();
    let response = await axios.get('https://app4me4u.herokuapp.com/api/user/'+sess.id+'/products');
    setSelfProducts(response.data)
    console.log("respuesta" + response.data[0])
    setModalVisible(true)
    }
  const renderItem = ({ item }) => (
    <Item title={item.name} id= {item._id}/>
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
        
        {!firstProductSelected &&  <View style={styles.modalView}>
            <Text style={styles.question}> ¿Que quieres prestar?</Text>
            <SafeAreaView>
              <FlatList
                data={selfProducts}
                renderItem={renderItem}
                keyExtractor={item => item._id}
              />
            </SafeAreaView>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={cancel}
            >
              <Text> Atrás</Text>
            </Pressable>
          </View>}
          {firstProductSelected &&  <View style={styles.modalView}>
            <Text style={styles.question}> ¿Qué producto quires obtener?</Text>
            <SafeAreaView>
              <FlatList
                data={otherProducts}
                renderItem={renderItem}
                keyExtractor={item => item._id}
              />
            </SafeAreaView>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={cancel}
            >
              <Text> Atrás</Text>
            </Pressable>
          </View>}
      </Modal>     
    <Pressable style={[styles.button, {backgroundColor: '#a2cff0'}]} onPress ={exchangeProduct} ><Text>Intercambiar Productos!</Text></Pressable>
    </>
)

}
const styles = StyleSheet.create({
    container: {
      width: '50%',
      height: 310,
      borderRadius: 10,
      borderColor: '#ffffff',
      borderWidth: 1,
      backgroundColor: '#f3f1ed',
    }, 
    modalView: {
      backgroundColor: "white",
      height: '100%',
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    cameraImage: {
      width: '100%', 
      height: 220, 
      borderRadius: 7,
      alignItems: 'flex-start'
          
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
    icono: {
      width: 30, 
      height: '100%',     
      alignItems: 'flex-start'    ,
      marginHorizontal: 2,
          
    },
    touchable: {
      width: '20%', 
      height: '100%',     
      borderRadius: 10,
      borderColor: 'green',
      alignItems: 'flex-start'   
          
          
    },
    title: {
      fontSize: 16,
      color: 'black',
      marginTop: '2%',
      marginLeft: '5%',
      width: '90%',
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
    textInput: {
      marginVertical: 15,
      height: 60,
      width: '90%',
    },  
    datePickerStyle: {
      width: 200,
      marginTop: 20,
    },
  });
  

export default ExchangeButton;