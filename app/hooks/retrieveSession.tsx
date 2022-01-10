import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';


export default async function retrieveSession () {
    try {
        const value = await AsyncStorage.getItem('userSession')
        if(value !== null) {
            console.log(value)
            return (JSON.parse(value));
        }
    } catch(e) {
        console.log(e)
        return null;
    }
 }
