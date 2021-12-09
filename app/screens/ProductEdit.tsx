import * as React from 'react';
import { Button, Platform,ScrollView, Image, StyleSheet,Modal, Dimensions, FlatList, Pressable, TouchableOpacity, Alert } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { Text, View } from '../components/Themed';
import { TextInput, Checkbox } from 'react-native-paper';
import { RootTabScreenProps } from '../types';

export default function EditProduct({ navigation }: RootTabScreenProps<'EditProduct'>) {
  const [name, onChangeName] = React.useState("");
  const [description, onChangeDescription] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState();

  const [checkedDonar, setCheckedDonar] = React.useState(false);
  const [checkedIntercambiar, setCheckedIntercambiar] = React.useState(false);
  const [checkedPrestar, setCheckedPrestar] = React.useState(false);
  
  const [numImages, setNumImages] = React.useState();     //número de imagenes, para controlar que por lo menos hay una

  const [image, setImage] = React.useState(null);
  const [image2, setImage2] = React.useState(null);
  const [image3, setImage3] = React.useState(null);
  const [image4, setImage4] = React.useState(null);
  const [image5, setImage5] = React.useState(null);
  const [image6, setImage6] = React.useState(null); 

  const [oldIds, setOldIds] = React.useState([]);   //necesarios para borrar, imagenes, elegir cual de ellos borrar  

  //copias auxiliares en caso de recargar el producto inicial
  const [checkedDonarAux, setCheckedDonarAux] = React.useState(false);
  const [checkedIntercambiarAux, setCheckedIntercambiarAux] = React.useState(false);
  const [checkedPrestarAux, setCheckedPrestarAux] = React.useState(false);

  const [numImagesAux, setNumImagesAux] = React.useState();     //número de imagenes inicial
  const [imageAux, setImageAux] = React.useState(null);
  const [image2Aux, setImage2Aux] = React.useState(null);
  const [image3Aux, setImage3Aux] = React.useState(null);
  const [image4Aux, setImage4Aux] = React.useState(null);
  const [image5Aux, setImage5Aux] = React.useState(null);
  const [image6Aux, setImage6Aux] = React.useState(null);

  const [url1, setUrl1] = React.useState(null);     
  const [url2, setUrl2] = React.useState(null);     
  const [url3, setUrl3] = React.useState(null);     
  const [url4, setUrl4] = React.useState(null);     
  const [url5, setUrl5] = React.useState(null);     
  const [url6, setUrl6] = React.useState(null); 
  
  const [deleteIds, setDeleteIds] = React.useState([]);

  const [productInfo, setProductInfo] = React.useState ({
    pname:"",
    pcategories:"",
    pdescription:"",
    pexchange:[]
  });

  const pid = '619e6fd140d15287ffe42aca';
  

  React.useEffect(() => {
    getInfo();
  }, []);  

  const getInfo = async () => {
    let response = await axios.get('https://app4me4u.herokuapp.com/api/product/' + pid);
    onChangeName(response.data.name)
    onChangeDescription(response.data.description)
    setSelectedCategory(response.data.categories)
    setCheckedDonar(false)
    setCheckedIntercambiar(false)
    setCheckedPrestar(false)
    setCheckedDonarAux(false)
    setCheckedIntercambiarAux(false)
    setCheckedPrestarAux(false)
    let exchange = [response.data.exchange];
    exchange.forEach(element => {
      //AÑADIR CODIGOS DE DONAR INTERCAMBIAR Y PRESTAR de exchange

      //      if(element == "present") setCheckedDonar(true);
//        else if(element == "exchange") setCheckedIntercambiar(true);
//        else if(element == "provide") setCheckedPrestar(true);
    if (element == "6193a583e47e769eeaa7a978"){
          setCheckedDonar(true);//no se que es exactamente
          setCheckedDonarAux(true);
    }

    })
    //response.data.img
    setProductInfo({
      ...productInfo,
      pname: response.data.name,
      pcategories: response.data.categories,
      pdescription: response.data.description,
      pexchange: exchange
    });


  //AÑADIR FOTOS

//    numImages =  (response.data.img).length;
    setNumImages((response.data.img).length);
    setNumImagesAux((response.data.img).length);

    if((response.data.img).length >= 1){
      setImage(response.data.img[0].url);
      setImageAux(response.data.img[0].url);

      oldIds.push(response.data.img[0]._id);
    }
    if((response.data.img).length >= 2){
      setImage2(response.data.img[1].url);
      setImage2Aux(response.data.img[1].url);

      oldIds.push(response.data.img[1]._id);

    }
    if((response.data.img).length >= 3){
      setImage3(response.data.img[2].url);
      setImage3Aux(response.data.img[2].url);
     
      oldIds.push(response.data.img[2]._id);

    }
    if((response.data.img).length >= 4){
      setImage4(response.data.img[3].url);
      setImage4Aux(response.data.img[3].url);

      oldIds.push(response.data.img[3]._id);
    }
    if((response.data.img).length >= 5){
      setImage5(response.data.img[4].url);
      setImage5Aux(response.data.img[4].url);

      oldIds.push(response.data.img[4]._id);
    }
    if((response.data.img).length >= 6){
      setImage6(response.data.img[5].url);
      setImage6Aux(response.data.img[5].url);

      oldIds.push(response.data.img[5]._id);

    }
    console.log(oldIds);
  };

  //recargar el producto sin editar
  function reloadProduct() {
    onChangeName(productInfo.pname)
    onChangeDescription(productInfo.pdescription)
    setSelectedCategory(productInfo.pcategories)
    let exchange = productInfo.pexchange
    setCheckedDonar(checkedDonarAux)
    setCheckedIntercambiar(checkedIntercambiarAux)
    setCheckedPrestar(checkedPrestarAux)

    setImage(imageAux)
    setImage2(image2Aux)
    setImage3(image3Aux)
    setImage4(image4Aux)
    setImage5(image5Aux)
    setImage6(image6Aux)

    setNumImages(numImagesAux);
  

    console.log(productInfo.pname + ' reloaded')
    console.log(productInfo.pdescription + ' reloaded')
    console.log(productInfo.pexchange[0] + ' reloaded')
  }

  const editImages = async () => {
    //DELETE pasar vector de ids
    //NOTA: no se pueden borrar todas las fotos, pasa cuando numImages == numImagesAux o 
    /*let oldId = [];
    //let oldId: string | never[] | AxiosRequestConfig<any> | undefined = [];
    if ((image  == null && image  != null) || image != imageAux  ) oldId = oldId + image;
    if ((image2 == null && image2 != null) || image2 != image2Aux) oldId = oldId + image2;
    if ((image3 == null && image3 != null) || image3 != image3Aux) oldId = oldId + image3;
    if ((image4 == null && image4 != null) || image4 != image4Aux) oldId = oldId + image4;
    if ((image5 == null && image5 != null) || image5 != image5Aux) oldId = oldId + image5;
    if ((image6 == null && image6 != null) || image6 != image6Aux) oldId = oldId + image6;*/

    //FUNCIONASKDJKASF
    /*await axios
      .delete('https://app4me4u.herokuapp.com/api/product/'+ pid + "/image/" + deleteIds)
      .then(function(response) {
        console.log("Old images deleted")
      })
      .catch(function(error) {
        console.log(error);
    });*/

    //POST pasar url nuevas
    let newUrls = [image];
    var formData = new FormData();
    formData.append("path", image);

    console.log(formData);

    await axios
      .post('https://app4me4u.herokuapp.com/api/image/' + pid, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }})
      .then(function(response) {
        console.log("New images posted")
        console.log(response)
      })
      .catch(function(error) {
        console.log(error);
    });

  }

  const editProduct = async () => {
    let ex = [];
    if (checkedDonar) {
      ex.push('present')
    }
    if (checkedIntercambiar) {
      ex.push('exchange')
    }
    if (checkedPrestar) {
      ex.push('provide')
    }
    const newInfo = {
      name: name,
      categories: selectedCategory,
      description: description,
      exchange: ex      
    };

    await axios
      .put('https://app4me4u.herokuapp.com/api/product/update/' + pid, newInfo)
      .then(function(response) {
        const result = response.data
        console.log(result.name + ' edited')
        console.log(result.description + ' edited')
        setProductInfo({
          ...productInfo,
          pname: result.name,
          pcategories: result.categories,
          pdescription: result.description,
          pexchange: result.exchange
        });
        
      })
      .catch(function(error) {
        console.log(error);

    });
    editImages();
  }

  
   
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
    console.log(numImages);
    Alert.alert(
  '¿Que quieres hacer con tu foto?', '',
  [
    {
      text: 'Eliminar foto',
      onPress: () => {
        if (numImages == 1){
          Alert.alert(
            "Error",
            "No se puede borrar la última fotografia de un producto.",
            [{ text: "OK", onPress: () => console.log("Error al intentar borrar la última imagen de un producto.") }
            ]);
        }
        else{
          setNumImages(numImages -1);
          setImageById(id, '');
          if(undefined == deleteIds.find(element => element == oldIds[id])) {
            deleteIds.push(oldIds[id-1]);
            console.log(deleteIds);
          }
        }
      },
      style: 'default',
    },
    {
      text: 'Hacer una foto', 
      onPress: () => {

        //setImageById(id, '');
        pickImage(id, true);
      }
    },
  ],
  {cancelable: false},
  
);
  console.log(numImages);

  }



const pickImage = async (id?: Number, change?: Boolean) => {
  setNumImages(numImages +1);


  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  console.log(result);
  if (!result.cancelled ) {
    setImageById(id, '');

    if (id == 1){
      setImage(result.uri);
    } 
    else if(id == 2){
      setImage2(result.uri);
    }
    else if(id == 3){
      setImage3(result.uri);
    }
    else if(id == 4){
      setImage4(result.uri);
    }
    else if(id == 5){
      setImage5(result.uri);
    }
    else if(id == 6){
      setImage6(result.uri);
    }  
  }
  else {
    setNumImages(numImages -1);
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
          <Picker.Item label="Selecciona un categoria..." value="default" />          
          <Picker.Item label="tecnologia" value="61797e24b4a4d195aa14be8d" />
          <Picker.Item label="juguetes" value="61940e6f0c77883d581cede8" />
          <Picker.Item label="fashion" value="61a51c1649b1a2167fe86cfe" />
          <Picker.Item label="computer" value="61a51cc449b1a2167fe86d00" />
          <Picker.Item label="homeApplicances" value="61a51cd949b1a2167fe86d02" />
          <Picker.Item label="sports" value="61a51ceb49b1a2167fe86d04" />
          <Picker.Item label="home" value="61a51cf549b1a2167fe86d06" />
          <Picker.Item label="games" value="61a51d0149b1a2167fe86d08" />
          <Picker.Item label="movies" value="61a51d0b49b1a2167fe86d0a" />
          <Picker.Item label="children" value="61a51d1849b1a2167fe86d0c" />
          <Picker.Item label="construction" value="61a51d2349b1a2167fe86d0e" />
          <Picker.Item label="other" value="61a51d4649b1a2167fe86d12" />
{//          <Picker.Item label="games" value="61a51d5049b1a2167fe86d14" />
}
          <Picker.Item label="pets" value="61a51dbc49b1a2167fe86d1b" />




        </Picker>        
        <Text style={[styles.title, {marginTop:20}]}> ¿Que quieres hacer con tu producto?</Text>        
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
          <TouchableOpacity  onPress={() => unPickImage(1)}>
            <Image style={styles.image} source={{ uri: image }} />
          </TouchableOpacity>  }          
          {!image && 
          <TouchableOpacity style={styles.notImage} onPress={() => pickImage(1)}>
            <Image source={require('../images/camara2.png')}  style={styles.cameraImage} />  
          </TouchableOpacity>  }
          {image2 && 
          <TouchableOpacity  onPress={() => unPickImage(2)}>
          <Image style={styles.image} source={{ uri: image2 }} />
          </TouchableOpacity>  }  
          {!image2 && 
          <TouchableOpacity style={styles.notImage} onPress={() => pickImage(2)}>
            <Image source={require('../images/camara2.png')}  style={styles.cameraImage} />  
          </TouchableOpacity>  }
          {image3 && 
          <TouchableOpacity  onPress={() => unPickImage(3)}>
          <Image style={styles.image} source={{ uri: image3 }} />
          </TouchableOpacity>  }  
          {!image3 && 
          <TouchableOpacity style={styles.notImage} onPress={() => pickImage(3)}>
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
          <TouchableOpacity style={styles.notImage} onPress={() => pickImage(4)}>
          <Image source={require('../images/camara2.png')}  style={styles.cameraImage} />  
          </TouchableOpacity>  }
          {image5 && 
          <TouchableOpacity  onPress={() => unPickImage(5)}>
          <Image style={styles.image} source={{ uri: image5 }} />
          </TouchableOpacity>}
          {!image5 &&
          <TouchableOpacity style={styles.notImage} onPress={() => pickImage(5)}>
          <Image source={require('../images/camara2.png')}  style={styles.cameraImage} />  
          </TouchableOpacity>  }
          {image6 && 
          <TouchableOpacity  onPress={() => unPickImage(6)}>
          <Image style={styles.image} source={{ uri: image6 }} />
          </TouchableOpacity>}
          {!image6 && 
          <TouchableOpacity style={styles.notImage} onPress={() => pickImage(6)}>
          <Image source={require('../images/camara2.png')}  style={styles.cameraImage} />  
          </TouchableOpacity>  }
        </View>    
        <Pressable style={[styles.button, {backgroundColor: '#a2cff0'}]} onPress ={editImages} ><Text>¡Actualizar!</Text></Pressable>
        <Pressable style={[styles.button, {backgroundColor: '#dcf9fc'}]} onPress ={reloadProduct}><Text>Cancelar</Text></Pressable>
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
  checkbox:{
    flexDirection: "row",           
    marginTop: 10,
    alignItems:'center',
    width:'80%',  
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
