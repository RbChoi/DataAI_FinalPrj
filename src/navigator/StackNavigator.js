import 'react-native-gesture-handler'; 
//npm i react-native-gesture-handler
import React, {Component} from 'react';
import {StyleSheet} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
//npm install @react-navigation/stack
import { NavigationContainer } from '@react-navigation/native'
import MainScreen from '../main/MainScreen'
import OrderCheckScreen from '../main/OrderCheckScreen'
import OrderFinishScreen from '../main/OrderFinishScreen'
import VoiceTest from '../main/VoiceTest'

const Stack = createStackNavigator();
const screenOptionStyle = {
  headerStyle: {
    backgroundColor: '#FBF8EC',
  },
}
export default StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen 
        name="Main"
        component={MainScreen}
        options={{
          title: "도울이",
          headerBackTitleStyle: {
            color: '#91888C',
            fontWeight: 'bold',
          },
          headerTitleStyle: { color: 'black' },
          headerTintColor: '#91888C'
        }}/>

        <Stack.Screen 
        name="OrderCheck"
        component={OrderCheckScreen}
        options={{
          title: "주문서",
          headerBackTitleStyle: {
            color: '#91888C',
            fontWeight: 'bold',
          },
          headerTitleStyle: { color: 'black' },
          headerTintColor: '#91888C'
        }}
        />
        <Stack.Screen 
        name="OrderFinish"
        component={OrderFinishScreen}
        options={{
          title: "주문완료",
          headerBackTitleStyle: {
            color: '#91888C',
            fontWeight: 'bold',
          },
          headerTitleStyle: { color: 'black' },
          headerTintColor: '#91888C'
        }}
        />
      </Stack.Navigator>

    </NavigationContainer>
  )
};

