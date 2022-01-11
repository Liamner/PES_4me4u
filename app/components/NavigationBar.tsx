import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
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

        <TouchableOpacity onPress={() => navigation.navigate("EditProduct")}>
          {upload && <Icon name='add-circle' size={30} color={highlight}/>}
          {!upload && <Icon name='add-circle-outline' size={30} color={normal}/>}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("ChatList")} >
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
  navigator: {
    height: 45,
    borderTopStartRadius: 4,
    borderTopEndRadius: 4,
    backgroundColor: "#a2cff0",
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
});


export default NavigationBar;