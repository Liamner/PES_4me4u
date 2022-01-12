import React from "react";
import {StyleSheet, View , Text, TouchableOpacity, Pressable, Alert} from "react-native";
import {Modal, SafeAreaView, FlatList } from 'react-native';
import axios from 'axios'
import navigation from "../navigation";
import { WebView } from 'react-native-webview'; 
import { Button } from "react-native-paper";

type MapProps = {
  origin: string,
  destination: string,
}

export function EcommuteAPI  ({origin, destination}:MapProps) {   
  console.log("origin" + origin)
  const [iframe, setIframe] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(false);
  const selectRoute = async(origin: String, destination: String) => {
    const response = await axios.get('http://10.4.41.35:3000/routes/map?origin=Barcelona&destination=Madrid&mode=driving&username=formeforu&password=formeforu&width=100&height=100')
  .catch(function (error) {
    if (error.response) {
      // Request made and server responded
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }

  });
    const res = await axios.get('http://10.4.41.35:3000/routes/map', { params: { destination: destination, origin: origin, mode: "transit", username: "formeforu", password: "formeforu", width: "1000", height: "1000" } });
    setIframe(res.data.iframe);
  }
  selectRoute(origin ,destination);
  return (
    <>   
    <Pressable
        style={[styles.button, styles.buttonClose]}
        onPress={() => setModalVisible(true)}
      >
        <Text> Mostrar ruta</Text>
      </Pressable>
     <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {        
          setModalVisible(!modalVisible);
        }}
      >
         <WebView 
        originWhitelist={['*']} 
        source={{ html: iframe }} /> 
        <Pressable
        style={styles.button}
        onPress={() => setModalVisible(false)}
      >
        <Text> Atrás</Text>
      </Pressable>
      </Modal>
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
    datePickerStyle: {
      width: 200,
      marginTop: 20,
    },
  });
  

export default EcommuteAPI;