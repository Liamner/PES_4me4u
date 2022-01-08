import React from "react";
import {StyleSheet, View , Text, TouchableOpacity, Pressable, Alert} from "react-native";
import {Modal, Image, SafeAreaView, FlatList } from 'react-native';
import axios from 'axios'
import navigation from "../navigation";
import DateTimePicker from '@react-native-community/datetimepicker';
import { RootTabScreenProps } from "../types";

type Props = {
  navigation: any,
  casa?: boolean,
  corazon?: boolean,
  upload?: boolean,
  chat?: boolean,
  profile?: boolean,
}

export function NavigationBar({navigation, casa, corazon, upload, chat, profile}:Props) {   
  return (
    <>   
      <View style = {styles.navigator}>
      <TouchableOpacity  onPress={()=>navigation.navigate("FirstScreen")}>
        {casa && <Image source={require('../images/selected/casa.png')} style={styles.icono}/>  }
        {!casa && <Image source={require('../images/noSelected/casa.png')} style={styles.icono}/>  }       
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.navigate("ProductSearch")}>
        {corazon && <Image source={require('../images/search.png')} style={styles.icono}/>  }
        {!corazon && <Image source={require('../images/search.png')} style={styles.icono}/>  }
      </TouchableOpacity>
      <TouchableOpacity   onPress={()=>navigation.navigate("CreateProduct")}>
        {upload && <Image source={require('../images/selected/add.png')} style={styles.icono}/>  }
        {!upload && <Image source={require('../images/noSelected/add.png')} style={styles.icono}/>  }
      </TouchableOpacity>    
      <TouchableOpacity onPress={()=>navigation.navigate("TestScreen")} >
        {chat && <Image source={require('../images/selected/chat.png')} style={styles.icono}/>  }
        {!chat && <Image source={require('../images/noSelected/chat.png')} style={styles.icono}/>  }
      </TouchableOpacity>  
      <TouchableOpacity   onPress={()=>navigation.navigate("UserRead")}>
        {profile && <Image source={require('../images/selected/profile.png')} style={styles.icono}/>  }
        {!profile && <Image source={require('../images/noSelected/profile.png')} style={styles.icono}/>  }
      </TouchableOpacity>    
    </View>
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
    navigator: {    
      height: 45,
      borderColor: '#5e5c57',
      borderWidth: 1,
      backgroundColor: '#e2e2e1',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      //borderRadius: 20,
      padding: 10,
     //elevation: 2,
     width: '100%',
      position: 'absolute',
      bottom: 0,
     // left: 10,
    }, 
    icono: {
      width: 35,
      height: 35,        
    },
  });
  

export default NavigationBar;