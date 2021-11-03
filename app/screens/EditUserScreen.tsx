import * as React from 'react';
import { StyleSheet, TouchableOpacity, Image, Alert, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { TextInput } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import GooglePlacesInput from '../components/GooglePlacesInput';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { RootTabScreenProps } from '../types';

export default function EditUserScreen({ navigation }: RootTabScreenProps<'EditUser'>) {
  const [name, onChangeName] = React.useState("");  
  const [firstSurname, onChangeFirstSurname] = React.useState("");  
  const [secondSurname, onChangeSecondSurname] = React.useState("");  
  const [email, onChangeEmail] = React.useState("");  
  const [image, setImage] = React.useState(null);

  const pickImage = async () => {    
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    console.log(result);
  
    if (!result.cancelled ) {
      setImage(result.uri);
    }
    };
    const unPickImage = async () => {
      Alert.alert(
    '¿Que quieres hacer con tu foto?',
    '',
    [    
      {
        text: 'Eliminar foto',
        onPress: () => {
          setImage(null);
        },
        style: 'default',
      },
      {
        text: 'Hacer una foto', 
        onPress: () => {
          setImage(null);
          pickImage();
        }
      },
    ],
    {cancelable: false},
  );
  }
  return (
    <ScrollView 
      keyboardShouldPersistTaps='always'
    >
      <View 
         style={{
          flexDirection: "row",          
          marginTop: 30
        }}>
          <Text style={styles.title}>Información Básica</Text>
        {image && 
        <TouchableOpacity style={{marginHorizontal: 50}} onPress={unPickImage}>
          <Image style={styles.image} source={{ uri: image }} />
        </TouchableOpacity>  }          
        {!image && 
        <TouchableOpacity style={[styles.notImage, {marginHorizontal: 50}]} onPress={pickImage}>
          <Image source={require('../images/camara2.png')}  style={styles.cameraImage} />  
        </TouchableOpacity>  }

        </View>
      <View style={styles.container}>        
        <TextInput
          label="Nombre"
          style={styles.textInput}       
          onChangeText={onChangeName}
          value={name}
        />   
        <TextInput
          label="Primer apellido"
          style={styles.textInput}       
          onChangeText={onChangeFirstSurname}
          value={firstSurname}
        />   
        <TextInput
          label="Segundo apellido"
          style={styles.textInput}       
          onChangeText={onChangeSecondSurname}
          value={secondSurname}
        />   
        <GooglePlacesAutocomplete
          styles={{
              container: {
              width: '90%',
              },
              textInput: {
              backgroundColor: '#FFFFFF',
              marginVertical: 15,
              height: 60,
              fontSize: 15,
              flex: 1,
              },
          }}
          placeholder='Ubicación'
          
          onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              console.log("data, details                ++++++++++++++++++++");
              console.log(data, details)
          }}
          query={{
              key: 'AIzaSyC7JAeKR-u7CBU9vmztBqz-BIuhA8qu270',
              language: 'es',
          }}
        />
        <TextInput
          label="Correo Electronico"
          style={styles.textInput}       
          onChangeText={onChangeEmail}
          value={email}
        />           
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
  textInput: {
    marginVertical: 15,
    height: 60,
    width: '90%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20
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
  cameraImage: {
    width: 90, 
    height: 90, 
    marginTop: 1,
    marginLeft :2, 
    borderRadius: 3
  },
  image: {  
    marginHorizontal :5,
    width: 100,
    height: 100 ,
    borderRadius: 10,
    borderColor: '#5e5c57',
    borderWidth: 3,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
