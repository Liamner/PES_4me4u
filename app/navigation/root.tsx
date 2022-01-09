import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';

import EditProduct from '../screens/ProductEdit';
import ProductRead from '../screens/ProductRead';
import TestScreen from '../screens/TestScreen';
import FirstScreen from '../screens/FirstScreen';
import CreateProduct from '../screens/ProductCreate';
import ViewUser from '../screens/UserRead';	
import FollowersScreen from '../screens/FollowersScreen';	
import FollowedScreen from '../screens/FollowedScreen';	
import RateUser from '../screens/UserRate';
import ProductSearch from '../screens/ProductSearch';
import WishList from '../screens/UserWishlist';
import UserUpdate from '../screens/UserUpdate';
import ChatList from '../screens/ChatList';

import UserProducts from '../screens/UserProducts';

import NavigationBar from '../components/NavigationBar';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';


const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="FirstScreen" component={FirstScreen} options={{ headerShown: true, headerBackVisible: false, title: '4me4u'}} />
      <Stack.Screen name="ProductSearch" component={ProductSearch} options={{ headerShown: true, headerBackVisible: false }} />
      <Stack.Screen name="CreateProduct" component={CreateProduct} options={{ headerShown: true, headerBackVisible: false }} />
      <Stack.Screen name="ChatList" component={ChatList} options={{ headerShown: true, headerBackVisible: false }} />    
      <Stack.Screen name="UserRead" component={ViewUser} options={{ headerShown: true, headerBackVisible: false  }} /> 
      <Stack.Screen name="OtherUserRead" component={ViewUser} options={{ headerShown: true }} /> 
      <Stack.Screen name="TestScreen" component={TestScreen} options={{ headerShown: true }} /> 
      <Stack.Screen name="UserWishlist" component={WishList} options={{ headerShown: true }} /> 
      <Stack.Screen name="FollowedScreen" component={FollowedScreen} options={{ headerShown: true }} />
      <Stack.Screen name="FollowersScreen" component={FollowersScreen} options={{ headerShown: true }} />
      <Stack.Screen name="UserUpdate" component={UserUpdate} options={{ headerShown: true }} />
      <Stack.Screen name="ProductRead" component={ProductRead} options={{ headerShown: true }} /> 
      <Stack.Screen name="UserProducts" component={UserProducts} options={{ headerShown: true }} /> 
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />     


      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
        
      </Stack.Group>
    </Stack.Navigator>
  );
}