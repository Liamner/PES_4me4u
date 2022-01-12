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
  const [isProductSelected, setIsProductSelected] = React.useState(false);
  const [productSelected, setProductSelected] = React.useState("");
  const [dateSelected, setDateSelected] = React.useState(false);
  const [date, setDate] = React.useState(new Date());
  const [mode, setMode] = React.useState('date');
  const [products, setProducts] = React.useState();

  const getProducts = async () => {    
    console.log("dar procuto")
    //61ba2a4f6bd96835a7895b33
    let response = await axios.get('https://app4me4u.herokuapp.com/api/user/61ba2a4f6bd96835a7895b33/products');
    setProducts(response.data)
    console.log("respuesta" + response.data[0])
    setModalVisible(true)
    };
    
  const selectDate = async(event: any, selectedDate: Date) => {
  console.log("selected:" + selectedDate)
  console.log("PRODUCT NAME: " +  + "ID: " + productSelected)
    if(selectedDate != null){
      //usar selected date, si selected date es null, pasamos
      //llamada a api
     if(selectedDate < new Date()){
      Alert.alert("La fecha seleccionada no es valida");
      setDateSelected(false)
      return;
     } 

      let response = await axios.post('https://app4me4u.herokuapp.com/api/tradeLoan/create', {
      userTaking: "61a3855a5cd77458b48896ed",
      product  : productSelected,
      returnDate : selectedDate,
    }).then(function (response) {
      console.log("response: " + response.status);
    })
    .catch(function (error) {
      console.log("error" + error);
    });
    console.log("second respones" + response)
      //TODO borrar set product  i set date
      setIsProductSelected(false);
      setDateSelected(false)
      setModalVisible(false);
    }
    else setDateSelected(false)
    const currentDate = selectedDate || date;
    setDate(currentDate)
    //usar selected date, si selected date es null, pasamos
  };

  const cancel = () => {
    setIsProductSelected(false);
    setModalVisible(false);
  };
  const selectProduct = (id:string )=> {
    setIsProductSelected(true)
    setProductSelected(id);
  }
  
  const Item = ({ title, id}) => (
    <TouchableOpacity onPress = {() => selectProduct(id)}>
      <View style={styles.item}>      
        <Text style={styles.itemTitle}>{title}</Text>
        <View  style= {{height:1.5, backgroundColor:'#cacaca'}}/>
      </View>
    </TouchableOpacity>
  );
  const renderItem = ({ item }) => (
    <Item title={item.name} id ={item._id}/>
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
        {!isProductSelected &&  <View style={styles.modalView}>
            <Text style={styles.question}>¿Que quieres prestar?</Text>
            <SafeAreaView>
              <FlatList
                data={products}
                renderItem={renderItem}
                keyExtractor={item => item._id}
              />
            </SafeAreaView>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(false)}
            >
              <Text> Atrás</Text>
            </Pressable>
          </View>}
          {isProductSelected &&  <View style={styles.modalView}>
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
    <Pressable style={[styles.button, {backgroundColor: '#a2cff0'}]} onPress ={() => console.log("intercambio")} ><Text>Prestar</Text></Pressable>
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
      paddingVertical: 0,
      paddingHorizontal: 0,
      margin : 10,
      borderRadius: 4,
      elevation: 3,
      width: 100, 
      height: 30,   
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