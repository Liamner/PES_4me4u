import * as React from 'react';
import { Button, Platform, ScrollView, Image, StyleSheet, Modal, Dimensions, FlatList, Pressable, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios, { AxiosResponse } from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { Text, View } from '../components/Themed';
import { TextInput, Checkbox } from 'react-native-paper';
import { RootTabScreenProps } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavigationBar from '../components/NavigationBar';

export default function CreateProduct({ navigation }: RootTabScreenProps<'CreateProduct'>) {
  const [pid, setProductID] = React.useState('');
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
  const imageArray = [image, image2, image3, image4, image5, image6];
  const [session, setSession] = React.useState({
    id: "",
    user:"",
    token:""
})

const getData = async () => {
    try {
        const value = await AsyncStorage.getItem('userSession')
        if(value !== null) {
            setSession(JSON.parse(value))
            console.log(value)
        }
        else {
            console.log("empty")
        }
    } catch(e) {
        console.log(e)
    }
  }
  const [newImages, setNewImages] = React.useState([]);

  React.useEffect(() => {
    getData();
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
    if (uri != '') {
      if (id == 1) setImage(uri)
      if (id == 2) setImage2(uri)
      if (id == 3) setImage3(uri)
      if (id == 4) setImage4(uri)
      if (id == 5) setImage5(uri)
      if (id == 6) setImage6(uri)
    }
    else {
      if (id == 1) setImage(null)
      if (id == 2) setImage2(null)
      if (id == 3) setImage3(null)
      if (id == 4) setImage4(null)
      if (id == 5) setImage5(null)
      if (id == 6) setImage6(null)
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
            //setImageById(id, '');
            pickImage(id);
          }
        },
      ],
      { cancelable: false },
    );

  }

  const pickImage = async (id?: Number) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled ) {
    setImageById(id, '');
      
    if (id == 1){
      setImage(result.uri);
      newImages.push(result.uri);
    } 
    else if(id == 2){
      setImage2(result.uri);
      newImages.push(result.uri);
    }
    else if(id == 3){
      setImage3(result.uri);
      newImages.push(result.uri);
    }
    else if(id == 4){
      setImage4(result.uri);
      newImages.push(result.uri);
    }
    else if(id == 5){
      setImage5(result.uri);
      newImages.push(result.uri);
    }
    else if(id == 6){
      setImage6(result.uri);
      newImages.push(result.uri);
    }  
  }
  };

  const setImages = async (response: AxiosResponse<unknown, any>) => {
    console.log(newImages);

      newImages.forEach( async (element) => {
        console.log('Empieza post de ' + element);
        const uri = element;
        const uriParts = uri.split('.');
        const fileType = uriParts[uriParts.length - 1];
        const formData = new FormData();
        formData.append('img', {
          uri,
          name: `photo.${fileType}`,
          type: `image/${fileType}`,
        });
        console.log(formData);

        console.log('pid: ' + response.data._id);
  
        await axios
          .post('https://app4me4u.herokuapp.com/api/image/' + response.data._id, formData, {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
            }})
          .then(function(response) {
            console.log("New images posted")
            //console.log(response)
          })
          .catch(function(error) {
            console.log(error);
        });
      });
  }

  const sendApi = async () => {
    
    console.log("sending product")
    const config = {
      headers: {
        Authorization: `Bearer ${session.token}`
      }
    }
    await axios.post('https://app4me4u.herokuapp.com/api/product/create', {
      name: name,
      categories: selectedCategory,
      description: description,
      exchange: "present",
      state: "available",
      }, config)
      .then(function (response) {
        setImages(response);
      })
        .catch(function (error) {
          console.log(error);
      });

      

  }
  return (
    <>
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
          style={styles.title}> Categorias </Text>
        <Picker
          selectedValue={selectedCategory}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedCategory(itemValue)
          }>
          <Picker.Item label="Selecciona un categoria..." value="default" />          
          <Picker.Item label="fashion" value="fashion" />
          <Picker.Item label="computer" value="computer" />
          <Picker.Item label="homeApplicances" value="homeApplicances" />
          <Picker.Item label="sports" value="sports" />
          <Picker.Item label="home" value="home" />
          <Picker.Item label="videogames" value="videogames" />
          <Picker.Item label="movies" value="movies" />
          <Picker.Item label="children" value="children" />
          <Picker.Item label="construction" value="construction" />
          <Picker.Item label="pets" value="pets" />
          <Picker.Item label="games" value="games" />
          <Picker.Item label="other" value="other" />
        </Picker>
        <Text style={[styles.title, { marginTop: 20 }]}> ¿Que quieres hacer con tu producto?</Text>
        <View
          style={styles.checkbox}>
          <Checkbox
            status={checkedDonar ? 'checked' : 'unchecked'}
            onPress={() => {
              setCheckedDonar(!checkedDonar);
            }}
          />
          <Text >Donar</Text>
        </View>
        <View
          style={styles.checkbox}>
          <Checkbox
            status={checkedPrestar ? 'checked' : 'unchecked'}
            onPress={() => {
              setCheckedPrestar(!checkedPrestar);
            }}
          />
          <Text >Prestar</Text>
        </View>
        <View
          style={styles.checkbox}>
          <Checkbox
            status={checkedIntercambiar ? 'checked' : 'unchecked'}
            onPress={() => {
              setCheckedIntercambiar(!checkedIntercambiar);
            }}
          />
          <Text >Intercambiar</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 30
          }}>

          {image &&
            <TouchableOpacity onPress={() => unPickImage(1)}>
              <Image style={styles.image} source={{ uri: image }} />
            </TouchableOpacity>}
          {!image &&
            <TouchableOpacity style={styles.notImage} onPress={() => pickImage(1)}>
              <Image source={require('../images/camara2.png')} style={styles.cameraImage} />
            </TouchableOpacity>}
          {image2 &&
            <TouchableOpacity onPress={() => unPickImage(2)}>
              <Image style={styles.image} source={{ uri: image2 }} />
            </TouchableOpacity>}
          {!image2 &&
            <TouchableOpacity style={styles.notImage} onPress={() => pickImage(2)}>
              <Image source={require('../images/camara2.png')} style={styles.cameraImage} />
            </TouchableOpacity>}
          {image3 &&
            <TouchableOpacity onPress={() => unPickImage(3)}>
              <Image style={styles.image} source={{ uri: image3 }} />
            </TouchableOpacity>}
          {!image3 &&
            <TouchableOpacity style={styles.notImage} onPress={() => pickImage(3)}>
              <Image source={require('../images/camara2.png')} style={styles.cameraImage} />
            </TouchableOpacity>}
        </ View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 10
          }}>
          {image4 &&
            <TouchableOpacity onPress={() => unPickImage(4)}>
              <Image style={styles.image} source={{ uri: image4 }} />
            </TouchableOpacity>}
          {!image4 &&
            <TouchableOpacity style={styles.notImage} onPress={() => pickImage(4)}>
              <Image source={require('../images/camara2.png')} style={styles.cameraImage} />
            </TouchableOpacity>}
          {image5 &&
            <TouchableOpacity onPress={() => unPickImage(5)}>
              <Image style={styles.image} source={{ uri: image5 }} />
            </TouchableOpacity>}
          {!image5 &&
            <TouchableOpacity style={styles.notImage} onPress={() => pickImage(5)}>
              <Image source={require('../images/camara2.png')} style={styles.cameraImage} />
            </TouchableOpacity>}
          {image6 &&
            <TouchableOpacity onPress={() => unPickImage(6)}>
              <Image style={styles.image} source={{ uri: image6 }} />
            </TouchableOpacity>}
          {!image6 &&
            <TouchableOpacity style={styles.notImage} onPress={() => pickImage(6)}>
              <Image source={require('../images/camara2.png')} style={styles.cameraImage} />
            </TouchableOpacity>}
        </View>
        <Pressable style={[styles.button, { backgroundColor: '#a2cff0' }]} onPress={sendApi} ><Text> Subir Producto !</Text></Pressable>
        <Pressable style={[styles.button, { backgroundColor: '#dcf9fc' }]}><Text> Cancelar </Text></Pressable>
      </View>
    </ScrollView>
    <NavigationBar  navigation={navigation} upload={true}/>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 45
  },
  icono: {
    width: 35,
    height: 35,
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
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    margin: 10,
    borderRadius: 4,
    elevation: 3,
    width: '90%',
    backgroundColor: '#a2cff0',
  },
  checkbox: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: 'center',
    width: '80%',
  },
  image: {
    marginHorizontal: 5,
    width: 100,
    height: 100,
    borderRadius: 10,
    borderColor: '#5e5c57',
    borderWidth: 3,
  },
  cameraImage: {
    width: 90,
    height: 90,
    marginTop: 1,
    marginLeft: 2,
    borderRadius: 3
  },
  notImage: {
    marginHorizontal: 5,
    width: 100,
    height: 100,
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
  picker: {
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
