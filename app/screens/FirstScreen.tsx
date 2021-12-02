import * as React from 'react';
import { Button, Platform,ScrollView, Image, StyleSheet,Modal, SafeAreaView, SectionList, StatusBar, Dimensions, FlatList, Pressable, TouchableOpacity, Alert } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { TextInput, Checkbox } from 'react-native-paper';
import ProductCardElement from './ProductCardElement'
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
export default function FirstScreen({ navigation }: RootTabScreenProps<'FirstScreen'>) {

  const getProducts = () => {    
    console.log("response")
    //let response = await axios.get('https://app4me4u.herokuapp.com//product/');
    return <Text> hellou</Text>
  };

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2aed5-3ad53abb28ba',
      title: 'Electrodomesticos',
    },
    {
      id: 'bd7acbea-c11-46c2-aed5-3ad53abb28ba',
      title: 'Consolas y videojuegos',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28a',
      title: 'Cine, libros, música',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Niños y bebés',
    },
    {
      id: '58694a0f-3da1-471f-bd96-15571e29d72',
      title: 'Construcción y reformas',
    },
    {
      id: '58694a0f-3da1-471f-bd96-1455719d72',
      title: 'Juegos y juguetes',
    },
  ];
  
  const Item = ({ title }) => (
    <TouchableOpacity onPress = {() => setCategory(title)}>
      <View style={styles.item}>      
        <Text style={styles.itemTitle}>{title}</Text>
        <View  style= {{height:1.5, backgroundColor:'#cacaca'}}/>
      </View>
    </TouchableOpacity>
  );

  const [name, onChangeName] = React.useState("");  
  const [modalVisible, setModalVisible] = React.useState(false);
  const setCategory = async (title: String) => {    
    setModalVisible(false);
   };

  const renderItem = ({ item }) => (
    <Item title={item.title} />
  );

  return (    
    <>
    {getProducts()}
     <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
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
              <Text style={styles.textStyle}> Atrás</Text>
            </Pressable>
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
          <Image source={require('../images/ropa.png')} style={styles.iconoCategoria}/>  
          <Text style = {styles.textoCategoria}>Moda</Text>
          </View>

        </TouchableOpacity>
        <TouchableOpacity>
          <View style = {styles.elementoCategoria}>
          <Image source={require('../images/informatica.png')} style={styles.iconoCategoria}/>  
          <Text style = {styles.textoCategoria}>Informática</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
        <View style = {styles.elementoCategoria}>
          <Image source={require('../images/mascotas.png')} style={styles.iconoCategoria}/>  
          <Text style = {styles.textoCategoria}>Mascotas</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
        <View style = {styles.elementoCategoria}>
          <Image source={require('../images/hogar.png')} style={styles.iconoCategoria}/>  
          <Text style = {styles.textoCategoria}>Hogar</Text>
          </View>

        </TouchableOpacity>  
        <TouchableOpacity>
        <View style = {styles.elementoCategoria}>
          <Image source={require('../images/deporte.png')} style={styles.iconoCategoria}/>  
          <Text style = {styles.textoCategoria}>Ocio</Text>
          </View>

        </TouchableOpacity>    
        <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style = {styles.elementoCategoria}>
          <Image source={require('../images/otros.png')} style={styles.iconoCategoria}/>  
          <Text style = {styles.textoCategoria}>Otros</Text>
          </View>

        </TouchableOpacity>   
       </ScrollView>
    <ScrollView>
    <View style = {styles.fila}>                  
      <ProductCard name ={"Olla a presion"}  guardado ={true} arrayTratos ={["intercambiar", "give", "exchange"]}/>
      <ProductCard name ={"Bicicleta de Montaña"}  guardado ={true} arrayTratos ={["intercambiar", "give", "exchange"]}/>
      </View>                    
      <View style = {styles.fila}>                  
      <ProductCard name ={"Bicicleta de Montaña"}  guardado ={false} arrayTratos ={["intercambiar", "regalar", "prestar"]}/>
      <ProductCard name ={"paraguas de viento"}  guardado ={false} arrayTratos ={["intercambiar", "give", "exchange"]}/>
      </View>                    
      <View style = {styles.fila}>                  
      <ProductCard name ={"Bicicleta de Montaña"}  guardado ={false} arrayTratos ={["exchange", "loan", "prestar"]}/>
      <ProductCard name ={"Bicicleta de Montaña"}  guardado ={false} arrayTratos ={["intercambiar", "give", "loan"]}/>
      </View>  
    </ScrollView>    
    <View style = {styles.navigator}>
      <TouchableOpacity>
        <Image source={require('../images/casa.png')} style={styles.icono}/>  
      </TouchableOpacity>
      <TouchableOpacity>
        <Image source={require('../images/corazon.png')} style={styles.icono}/>  
      </TouchableOpacity>
      <TouchableOpacity   onPress={()=>navigation.navigate("CreateProduct")}>
        <Image source={require('../images/add.png')} style={styles.icono}/>  
      </TouchableOpacity>    
      <TouchableOpacity>
        <Image source={require('../images/chat.png')} style={styles.icono}/>  
      </TouchableOpacity>  
      <TouchableOpacity>
        <Image source={require('../images/profile.png')} style={styles.icono}/>  
      </TouchableOpacity>    
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  flatList: {     
  }, 
  fila: {
    flexDirection: 'row', 
    backgroundColor: 'white'
  },
  scrollCategorias: {
    borderRadius: 10,
    borderColor: '#5e5c57',
    borderWidth: 3,
    backgroundColor: 'white',
    width: '100%',
    height: 120,
    alignContent: 'space-between'
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
    width: 80,    
    backgroundColor:'white',
    alignItems: 'center',    
    marginHorizontal: 5,
    marginTop: 8,
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
  itemTitle: {
    fontSize: 22,
    color: 'black',
    padding: 10,    
    paddingLeft: 14,
    fontWeight: "bold"
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
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  item: {
    backgroundColor: "#ffffff",
    borderColor:'black',
    marginVertical: 1
  },
});
