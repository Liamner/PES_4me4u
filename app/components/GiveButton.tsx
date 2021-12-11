import React, { Component } from "react";
import {Alert, Button, StyleSheet, View , Text, Image, TouchableOpacity, Pressable} from "react-native";
import { Platform, ScrollView, Modal, SafeAreaView, SectionList, StatusBar, Dimensions, FlatList } from 'react-native';
import axios from 'axios'


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

export function GiveButton  () {  
  const [modalVisible, setModalVisible] = React.useState(false);
  const selectProduct = async (product: String) => {    
  await axios.post('https://app4me4u.herokuapp.com/api/tradeGive/create', {
      userOfering  : "61a2500c9b1c6cb5e2e0aa90",
      userTaking: "61a3855a5cd77458b48896ed",
      product  :"61a68d86d32c5e541ab70a14",
    }).then(function (response) {
      console.log("response: " + response.status);
    })
    .catch(function (error) {
      console.log("error" + error);
    });
    setModalVisible(false);
  };
  
  const Item = ({ title }) => (
    <TouchableOpacity onPress = {() => selectProduct(title)}>
      <View style={styles.item}>      
        <Text style={styles.itemTitle}>{title}</Text>
        <View  style= {{height:1.5, backgroundColor:'#cacaca'}}/>
      </View>
    </TouchableOpacity>
  );
  const renderItem = ({ item }) => (
    <Item title={item.title} />
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
            <Text style={styles.question}> ¿Que quieres regalar?</Text>
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
              <Text> Atrás</Text>
            </Pressable>
          </View>
      </Modal>     
    <Pressable style={[styles.button, {backgroundColor: '#a2cff0'}]} onPress ={() => setModalVisible(true)} ><Text>Dar Producto!</Text></Pressable>
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