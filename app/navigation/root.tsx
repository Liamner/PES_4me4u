import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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
import UserRate from '../screens/UserRate';
import ProductSearch from '../screens/ProductSearch';
import WishList from '../screens/UserWishlist';
import UserUpdate from '../screens/UserUpdate';
import ChatList from '../screens/ChatList';
import ChatView from '../screens/ChatView';
import UserProducts from '../screens/UserProducts';

import { RootStackParamList } from '../types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="FirstScreen" component={FirstScreen} options={{ headerShown: true, headerBackVisible: false, headerShadowVisible: false, title: '4me4u'}} />
      <Stack.Screen name="ProductSearch" component={ProductSearch} options={{ headerShown: true, headerBackVisible: false, headerShadowVisible: false, title: 'Búsqueda' }} />
      <Stack.Screen name="CreateProduct" component={CreateProduct} options={{ headerShown: true, headerBackVisible: false, headerShadowVisible: false, title: 'Añadir producto' }} />
      <Stack.Screen name="ChatList" component={ChatList} options={{ headerShown: true, headerBackVisible: false, headerShadowVisible: false, title: 'Lista de chats' }} />    
      <Stack.Screen name="UserRead" component={ViewUser} options={{ headerShown: true, headerBackVisible: false, headerShadowVisible: false, title: 'Mi perfil'  }} /> 
      <Stack.Screen name="OtherUserRead" component={ViewUser} options={{ headerShown: true, headerShadowVisible: false }} /> 
      <Stack.Screen name="ChatView" component={ChatView} options={{ headerShown: true, headerShadowVisible: false}} /> 
      <Stack.Screen name="TestScreen" component={TestScreen} options={{ headerShown: true, headerShadowVisible: false }} /> 
      <Stack.Screen name="UserWishlist" component={WishList} options={{ headerShown: true, headerShadowVisible: false }} /> 
      <Stack.Screen name="FollowedScreen" component={FollowedScreen} options={{ headerShown: true, headerShadowVisible: false }} />
      <Stack.Screen name="FollowersScreen" component={FollowersScreen} options={{ headerShown: true, headerShadowVisible: false }} />
      <Stack.Screen name="UserUpdate" component={UserUpdate} options={{ headerShown: true, headerShadowVisible: false }} />
      <Stack.Screen name="ProductRead" component={ProductRead} options={{ headerShown: true, headerShadowVisible: false }} /> 
      <Stack.Screen name="UserProducts" component={UserProducts} options={{ headerShown: true, headerShadowVisible: false }} /> 
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />     


      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
        
      </Stack.Group>
    </Stack.Navigator>
  );
}