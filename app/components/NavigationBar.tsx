import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'


type Props = {
  navigation: any,
  casa?: boolean,
  search?: boolean,
  upload?: boolean,
  chat?: boolean,
  profile?: boolean,
}

export function NavigationBar({ navigation, casa, search, upload, chat, profile }: Props) {
  var highlight = '#111'
  var normal = '#111'
  return (
    <>
      <View style={styles.navigator}>
        <TouchableOpacity onPress={() => navigation.navigate("FirstScreen")}>
          {casa && <Icon name='home' size={30} color={highlight} />}
          {!casa && <Icon name='home-outline' size={30} color={normal} />}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("ProductSearch")}>
          {search && <Icon name='search' size={30} color={highlight}/>}
          {!search && <Icon name='search-outline' size={30} color={normal}/>}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("CreateProduct")}>
          {upload && <Icon name='add-circle' size={30} color={highlight}/>}
          {!upload && <Icon name='add-circle-outline' size={30} color={normal}/>}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("TestScreen")} >
          {chat && <Icon name='chatbubble-ellipses' size={30} color={highlight}/>}
          {!chat && <Icon name='chatbubble-ellipses-outline' size={30} color={normal}/>}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("UserProducts", { id: '' })} >
          {chat && <Icon name='chatbubble-ellipses' size={30} color={highlight}/>}
          {!chat && <Icon name='chatbubble-ellipses-outline' size={30} color={normal}/>}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("UserRead")}>
          {profile && <Icon name='person' size={30} color={highlight}/>}
          {!profile && <Icon name='person-outline' size={30} color={normal}/>}
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
    margin: 10,
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
    borderColor: 'black',
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
    backgroundColor: "#a2cff0",
    borderWidth: 1,
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