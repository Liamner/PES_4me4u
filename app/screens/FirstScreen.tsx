import * as React from 'react';
import { Button, Platform,ScrollView, Image, StyleSheet,Modal, Dimensions, FlatList, Pressable, TouchableOpacity, Alert } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { TextInput, Checkbox } from 'react-native-paper';
import ProductCardElement from './ProductCardElement'
import * as ImagePicker from 'expo-image-picker';
import ProductCard from '../components/ProductCard';
export default function FirstScreen({ navigation }: RootTabScreenProps<'FirstScreen'>) {
  
  const [name, onChangeName] = React.useState("");  
  const [modalVisible, setModalVisible] = React.useState(false);
  const pickImage = async (id?: Number) => {    
   console.log("hola")
   setModalVisible(true);
  };
  return (    
    <>
     <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
     <TextInput
        label="Buscar producto..."
        style={styles.textInput}       
        onChangeText={onChangeName}
        value={name}
       />  
       <ScrollView style = {styles.scrollCategorias} horizontal= {true}>
        <TouchableOpacity>
        <View style = {styles.elementoCategoria}>
          <Image source={require('../images/casa.png')} style={styles.iconoCategoria}/>  
          <Text style = {styles.textoCategoria}> Bicicletas </Text>
          </View>

        </TouchableOpacity>
        <TouchableOpacity>
          <View style = {styles.elementoCategoria}>
          <Image source={require('../images/casa.png')} style={styles.iconoCategoria}/>  
          <Text style = {styles.textoCategoria}> CocheeEEEs </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
        <View style = {styles.elementoCategoria}>
          <Image source={require('../images/casa.png')} style={styles.iconoCategoria}/>  
          <Text style = {styles.textoCategoria}> Barcos </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
        <View style = {styles.elementoCategoria}>
          <Image source={require('../images/casa.png')} style={styles.iconoCategoria}/>  
          <Text style = {styles.textoCategoria}> Bicicletas </Text>
          </View>

        </TouchableOpacity>  
        <TouchableOpacity>
        <View style = {styles.elementoCategoria}>
          <Image source={require('../images/casa.png')} style={styles.iconoCategoria}/>  
          <Text style = {styles.textoCategoria}> Bicicletas </Text>
          </View>

        </TouchableOpacity>    
        <TouchableOpacity onPress={() => pickImage(1)}>
        <View style = {styles.elementoCategoria}>
          <Image source={require('../images/reloj.png')} style={styles.iconoCategoria}/>  
          <Text style = {styles.textoCategoria}> Otros </Text>
          </View>

        </TouchableOpacity>   
       </ScrollView>
    <ScrollView style = {styles.scrollView}>
      <View style = {{flexDirection: 'row'}}>                  
      <ProductCard name ={"Olla a presion"}  prestar ={true} intercambiar ={true} regalar ={false} guardado ={true} />
      <ProductCard name ={"Bicicleta de Montaña"}  prestar ={true} intercambiar ={false} regalar ={false} guardado ={true}/>
      </View>                    
      <View style = {{flexDirection: 'row'}}>                  
      <ProductCard name ={"Bicicleta de Montaña"}  prestar ={true} intercambiar ={false} regalar ={true} guardado ={false} />
      <ProductCard name ={"paraguas de viento"}  prestar ={true} intercambiar ={false} regalar ={false} guardado ={false}/>
      </View>                    
      <View style = {{flexDirection: 'row'}}>                  
      <ProductCard name ={"Bicicleta de Montaña"}  prestar ={true} intercambiar ={false} regalar ={false} guardado ={false} />
      <ProductCard name ={"Bicicleta de Montaña"}  prestar ={true} intercambiar ={false} regalar ={false} guardado ={false}/>
      </View>                    
    </ScrollView>    
    <View style = {styles.navigator}>
      <TouchableOpacity>
        <Image source={require('../images/casa.png')} style={styles.icono}/>  
      </TouchableOpacity>
      <TouchableOpacity>
        <Image source={require('../images/corazon.png')} style={styles.icono}/>  
      </TouchableOpacity>
      <TouchableOpacity>
        <Image source={require('../images/add.png')} style={styles.icono}/>  
      </TouchableOpacity>    
      <TouchableOpacity>
        <Image source={require('../images/casa.png')} style={styles.icono}/>  
      </TouchableOpacity>  
      <TouchableOpacity>
        <Image source={require('../images/corazon.png')} style={styles.icono}/>  
      </TouchableOpacity>    
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {    
    borderRadius: 10,
    borderColor: '#5e5c57',
    borderWidth: 3,
    backgroundColor: 'pink',
  }, 
  scrollCategorias: {
    borderRadius: 10,
    borderColor: '#5e5c57',
    borderWidth: 3,
    backgroundColor: 'white',
    width: '100%',
    height: 110,
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
  container: {
    width: '50%',
    height: '50%',
    borderRadius: 10,
    borderColor: '#5e5c57',
    borderWidth: 3,
    backgroundColor: 'white',
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
  elementoCategoria: {
    backgroundColor:'white',
    alignItems: 'center',    
    marginHorizontal: 5,
    marginTop: 7,
  },
  touchable: {
    width: '20%', 
    height: '100%',     
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
  textInput: {
    height: 45,
    borderRadius: 10,
    borderColor: '#5e5c57',
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderRightWidth: 3,    
    backgroundColor: 'white'    
  },  
  notImage: {           
    marginHorizontal :5,    
    width: 100,
    height: 100 ,
    borderRadius: 10,
    borderColor: '#5e5c57',
    borderWidth: 3,
    backgroundColor: '#F0F0F0',    
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
