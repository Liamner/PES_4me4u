import React from "react";
import {StyleSheet, View , Text, TouchableOpacity, Pressable, Alert} from "react-native";
import {Modal, SafeAreaView, FlatList } from 'react-native';
import axios from 'axios'
import navigation from "../navigation";
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

export function LoanButton  () {   
  const [modalVisible, setModalVisible] = React.useState(false);
  const [productSelected, setProductSelected] = React.useState(false);
  const [dateSelected, setDateSelected] = React.useState(false);
  const [date, setDate] = React.useState(new Date());
  const [mode, setMode] = React.useState('date');
  const selectDate = async(event: any, selectedDate: Date) => {
  console.log(selectedDate)
    if(selectedDate != null){
      //usar selected date, si selected date es null, pasamos
      //llamada a api
     if(selectedDate < new Date()){
      Alert.alert("La fecha seleccionada no es valida");
      setDateSelected(false)
      return;
     } 

      let response = await axios.post('https://app4me4u.herokuapp.com/api/tradeLoan/create', {
      userOfering  : "61a2500c9b1c6cb5e2e0aa90",
      userTaking: "61a3855a5cd77458b48896ed",
      product  :"61a68d86d32c5e541ab70a14",
      returnDate : selectedDate,
    }).then(function (response) {
      console.log("response: " + response.status);
    })
    .catch(function (error) {
      console.log("error" + error);
    });
    console.log("second respones" + response)
      //TODO borrar set product  i set date
      setProductSelected(false);
      setDateSelected(false)
      setModalVisible(false);
      console.log("date not null")
    }
    else setDateSelected(false)
    const currentDate = selectedDate || date;
    setDate(currentDate)
    //usar selected date, si selected date es null, pasamos
  };

  const cancel = () => {
    setProductSelected(false);
    setModalVisible(false);
  };
  const selectProduct = async (product: String) => {    
    console.log(product)
  
    setProductSelected(true)
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
        {!productSelected &&  <View style={styles.modalView}>
            <Text style={styles.question}>¿Que quieres prestar?</Text>
            <SafeAreaView>
              <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
              />
            </SafeAreaView>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(false)}
            >
              <Text> Atrás</Text>
            </Pressable>
          </View>}
          {productSelected &&  <View style={styles.modalView}>
            <Text style={styles.question}>¿Hasta cuando quieres prestar?</Text>
            <Pressable style={[styles.button, {backgroundColor: '#a2cff0'}]}  onPress = {() => setDateSelected(true)} ><Text>Seleccionar fecha</Text></Pressable>
            { dateSelected && <DateTimePicker
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={selectDate}
            />}
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={cancel}
            >
              <Text> Atrás</Text>
            </Pressable>
          </View>}
      </Modal>     
    <Pressable style={[styles.button, {backgroundColor: '#a2cff0'}]} onPress ={() => setModalVisible(true)} ><Text>Prestar Producto!</Text></Pressable>
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
  

export default LoanButton;