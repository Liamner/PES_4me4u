import * as React from 'react';
import { Button, Platform,ScrollView, Image, StyleSheet,Modal, Dimensions, FlatList, Pressable, TouchableOpacity, Alert } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import EditScreenInfo from '../components/EditScreenInfo';
import * as ImagePicker from 'expo-image-picker';
import { Text, View } from '../components/Themed';
import { TextInput } from 'react-native-paper';
import { RootTabScreenProps } from '../types';

export default function CreateProduct({ navigation }: RootTabScreenProps<'CreateProduct'>) {
  const [name, onChangeName] = React.useState("Ya hay algo");  
  const [description, onChangeDescription] = React.useState("Aqui tambien hay algo que nos dará la api xD");  
  const [selectedCategory, setSelectedCategory] = React.useState("coche");
  const [image, setImage] = React.useState(null);
  const [image2, setImage2] = React.useState(null);
  const [image3, setImage3] = React.useState(null);
  const [image4, setImage4] = React.useState(null);
  const [image5, setImage5] = React.useState(null);
  const [image6, setImage6] = React.useState(null);    
  React.useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);  
  const setImageById = (id: Number, uri: string) => {      
      if(uri != ''){
        if(id == 1 ) setImage(uri)
        if(id == 2) setImage2(uri)
        if(id == 3) setImage3(uri)
        if(id == 4) setImage4(uri)
        if(id == 5) setImage5(uri)
        if(id == 6) setImage6(uri)
      }
      else{
        if(id == 1 ) setImage(null)
        if(id == 2) setImage2(null)
        if(id == 3) setImage3(null)
        if(id == 4) setImage4(null)
        if(id == 5) setImage5(null)
        if(id == 6) setImage6(null)
      }
  }
  const unPickImage = async (id: Number) => {
    Alert.alert(
  '¿Que quieres hacer con tu foto?',
  '',
  [    
    {
      text: 'Eliminar foto',
      onPress: () => {
        setImageById(id, '');
      },
      style: 'default',
    },
    {
      text: 'Hacer una foto', 
      onPress: () => {
        setImageById(id, '');
        pickImage(id);
      }
    },
  ],
  {cancelable: false},
);  
    
  }
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
    <ScrollView>
      <View style={styles.container}>     
      <TextInput
        label="Nombre del Producto"
        style={styles.textInput}       
        onChangeText={onChangeName}
        value={name}
       />       
       <TextInput
        label="Descripción"
        style={styles.textInput}       
        onChangeText={onChangeDescription}
        value={description}
       />
       <Text
       style ={styles.title}> Categorias </Text>
       <Picker
        selectedValue={selectedCategory}
        style={styles.picker}               
        onValueChange={(itemValue, itemIndex) =>
          setSelectedCategory(itemValue)
        }>
          <Picker.Item label="Selecciona un categoria" value="default" />
          <Picker.Item label="Coches" value="coche" />
          <Picker.Item label="Motos" value="moto" />
        </Picker>                 
        <View 
         style={{
          flexDirection: "row",          
          marginTop: 20
        }}>
                  
          {image && 
          <TouchableOpacity  onPress={() => unPickImage(1)}>
            <Image style={styles.image} source={{ uri: image }} />
          </TouchableOpacity>  }          
          {!image && 
          <TouchableOpacity style={styles.notImage} onPress={pickImage}>
            <Image source={require('../images/camara2.png')}  style={styles.cameraImage} />  
          </TouchableOpacity>  }
          {image2 && 
          <TouchableOpacity  onPress={() => unPickImage(2)}>
          <Image style={styles.image} source={{ uri: image2 }} />
          </TouchableOpacity>  }  
          {!image2 && 
          <TouchableOpacity style={styles.notImage} onPress={pickImage}>
            <Image source={require('../images/camara2.png')}  style={styles.cameraImage} />  
          </TouchableOpacity>  }
          {image3 && 
          <TouchableOpacity  onPress={() => unPickImage(3)}>
          <Image style={styles.image} source={{ uri: image3 }} />
          </TouchableOpacity>  }  
          {!image3 && 
          <TouchableOpacity style={styles.notImage} onPress={pickImage}>
          <Image source={require('../images/camara2.png')}  style={styles.cameraImage} />  
        </TouchableOpacity>  }        
        </ View>
        <View 
         style={{
           flexDirection: "row",           
           marginTop: 10
          }}>
          {image4 && 
          <TouchableOpacity  onPress={() => unPickImage(4)}>
          <Image style={styles.image} source={{ uri: image4 }} />
          </TouchableOpacity>}
          {!image4 && 
          <TouchableOpacity style={styles.notImage} onPress={pickImage}>
          <Image source={require('../images/camara2.png')}  style={styles.cameraImage} />  
          </TouchableOpacity>  }
          {image5 && 
          <TouchableOpacity  onPress={() => unPickImage(5)}>
          <Image style={styles.image} source={{ uri: image5 }} />
          </TouchableOpacity>}
          {!image5 &&
          <TouchableOpacity style={styles.notImage} onPress={pickImage}>
          <Image source={require('../images/camara2.png')}  style={styles.cameraImage} />  
          </TouchableOpacity>  }
          {image6 && 
          <TouchableOpacity  onPress={() => unPickImage(6)}>
          <Image style={styles.image} source={{ uri: image6 }} />
          </TouchableOpacity>}
          {!image6 && 
          <TouchableOpacity style={styles.notImage} onPress={pickImage}>
          <Image source={require('../images/camara2.png')}  style={styles.cameraImage} />  
          </TouchableOpacity>  }        
        </View>        
        <Pressable style={[styles.button, {backgroundColor: '#a2cff0'}]}><Text> Editar Producto !</Text></Pressable>
        <Pressable style={[styles.button, {backgroundColor: '#dcf9fc'}]}><Text> Cancelar </Text></Pressable>
      </View>      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  image: {  
    marginHorizontal :5,
    width: 100,
    height: 100 ,
    borderRadius: 10,
    borderColor: '#5e5c57',
    borderWidth: 3,
  },
  cameraImage: {
    width: 90, 
    height: 90, 
    marginTop: 1,
    marginLeft :2, 
    borderRadius: 3
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    width: '90%',
  },
  picker:{
    marginVertical: 10,
    height: 60,
    width: '90%',        
  },
  textInput: {
    marginVertical: 15,
    height: 60,
    width: '90%',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
