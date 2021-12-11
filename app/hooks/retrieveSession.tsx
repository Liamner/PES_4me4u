import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';


export default async function retrieveSession () {
    try {
        const value = await AsyncStorage.getItem('userSession')
        if(value !== null) {
            console.log("hello")
            return (JSON.parse(value));
        }
        else {
            console.log("empty")
        }
    } catch(e) {
        console.log(e)
    }
 }
