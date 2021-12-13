import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MainScreen({ navigation, route}) {
    const { Id, userId, email, pwd, role } = route.params;
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

      React.useEffect(() => {
        getData();
      }, []);  

    return (
        <View style={styles.main}>
            <Text>Hola {userId} </Text>
            <Text>token: {session.id}</Text>
            <Text>token: {session.token}</Text>
            <Text>token: {session.user}</Text>
        </View>
    )
}



const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
