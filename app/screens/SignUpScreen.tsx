import React from 'react'
import {StyleSheet,
    Button
} from 'react-native'
import { Text, View } from '../components/Themed';


export default function SignUp({navigation}) {
    return (
        <View style = {styles.container}>
            <Text>SignUp Screen</Text>
            <Button title= "Go to SignUp again"
            onPress={()=>navigation.push("SignUp") }
            />
            <Button title= "Go to Login Screen"
            onPress={()=>navigation.navigate("Login") }
            />
            <Button title= "Go to Root"
            onPress={()=>navigation.navigate("RootBottomTab") }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
})
