import * as React from 'react';
import { Button, Platform,ScrollView, Image, StyleSheet,Modal, Dimensions, FlatList, Pressable, TouchableOpacity, Alert } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import ProductCardElement from '../screens/ProductCardElement'
import * as ImagePicker from 'expo-image-picker';
import ProductCard from '../components/ProductCard';
export default function TestScreen({ navigation }: RootTabScreenProps<'TestScreen'>) {
  const [name, onChangeName] = React.useState("");  
  const [description, onChangeDescription] = React.useState("");  
  const [selectedCategory, setSelectedCategory] = React.useState();
  const [checkedDonar, setCheckedDonar] = React.useState(false);
  const [checkedIntercambiar, setCheckedIntercambiar] = React.useState(false);
  const [checkedPrestar, setCheckedPrestar] = React.useState(false);
  const [image, setImage] = React.useState(null);
  const [image2, setImage2] = React.useState(null);
  const [image3, setImage3] = React.useState(null);
  const [image4, setImage4] = React.useState(null);
  const [image5, setImage5] = React.useState(null);
  const [image6, setImage6] = React.useState(null);     
  const imageArray = [image, image2, image3, image4, image5, image6] ;
  const gatitos = { hola: "hola", adios: "adios"}
  const pickImage = async (id?: Number) => {    
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    console.log(result);
  
    if (!result.cancelled ) {
      if(!image || id == 1)setImage(result.uri);
      else if(!image2 || id == 2)setImage2(result.uri);
      else if(!image3 || id == 3)setImage3(result.uri);
      else if(!image4 || id == 4)setImage4(result.uri);
      else if(!image5 || id == 5)setImage5(result.uri);
      else if(!image6 || id == 6)setImage6(result.uri);
      
    }
  };
  return (    
    <>
    <ProductCard name ={"Bicicleta de "}  prestar ={true} intercambiar ={false} regalar ={false} guardado ={false} imageUri ={image}/>
     {!false && 
          <TouchableOpacity style={styles.notImage} onPress={pickImage}>
            <Image source={require('../images/camara2.png')}  style={styles.cameraImage} />  
          </TouchableOpacity>  }
      <View style = {{flexDirection: 'row'}}>                  
      <ProductCard name ={"Bicicleta de Montaña"}  prestar ={true} intercambiar ={false} regalar ={false} guardado ={false} />
      <ProductCard name ={"Bicicleta de Montaña"}  prestar ={true} intercambiar ={false} regalar ={false} guardado ={false}/>
      </View>                    
      <View style = {{flexDirection: 'row'}}>                  
      </View>       
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '50%',
    height: '50%',
    borderRadius: 10,
    borderColor: '#5e5c57',
    borderWidth: 3,
    backgroundColor: 'white',
  }, 
  cameraImage: {
    width: '100%', 
    height: '75%', 
    borderRadius: 7,
    alignItems: 'flex-start'
        
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
  textInput: {
    marginVertical: 15,
    height: 60,
    width: '90%',
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
});
