import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginPage from './screens/LoginPage';
import RegisterPage from './screens/RegisterPage';
import MainPage from './screens/MainPage';
import UpdatePage from './screens/UpdatePage';
import AddTaskPage from './screens/AddTaskPage';
import { Styles } from './Styles';

const Stack= createStackNavigator();

export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='LoginPage' >
        <Stack.Screen name='LoginPage' component={LoginPage}
        options={{
          // title:'Keep notes',
          // headerTitleAlign:'center',
          // headerTitleStyle:{fontWeight:'bold'},
          //headerBackground:()=>(<Image source={{uri:'https://i0.wp.com/www.watermeetsmoney.com/wp-content/uploads/2017/11/Header-background-2.png?ssl=1'}} style={Styles.headerBackImage} resizeMode={'cover'} ></Image>),
          headerShown:false,
        }}
         ></Stack.Screen>
        <Stack.Screen name='RegisterPage' component={RegisterPage} 
         options={{
          title:'Keep notes',
          headerTintColor:'#AEAEB3',
          headerTitleAlign:'center',
          headerTitleStyle:{fontWeight:'bold'},
          headerStyle:{backgroundColor:'#2E2E31', borderBottomColor:'#2E2E31'},
          //headerBackground:()=>(<Image source={{uri:'https://i0.wp.com/www.watermeetsmoney.com/wp-content/uploads/2017/11/Header-background-2.png?ssl=1'}} style={Styles.headerBackImage} resizeMode={'cover'} ></Image>)
        }}
        ></Stack.Screen>
        <Stack.Screen name='MainPage' component={MainPage} 
         options={{
          title:'Keep notes',
          headerTintColor:'#AEAEB3',
          headerTitleAlign:'center',
          headerTitleStyle:{fontWeight:'bold'},
          headerStyle:{backgroundColor:'#2E2E31', borderBottomColor:'#2E2E31'},
          //headerBackground:()=>(<Image source={{uri:'https://i0.wp.com/www.watermeetsmoney.com/wp-content/uploads/2017/11/Header-background-2.png?ssl=1'}} style={Styles.headerBackImage} resizeMode={'cover'} ></Image>)
        }}
        ></Stack.Screen> 
        <Stack.Screen name='UpdatePage' component={UpdatePage} 
         options={{
          title:'Keep notes',
          headerTintColor:'#AEAEB3',
          headerTitleAlign:'center',
          headerTitleStyle:{fontWeight:'bold'},
          headerStyle:{backgroundColor:'#2E2E31', borderBottomColor:'#2E2E31'},
          //headerBackground:()=>(<Image source={{uri:'https://i0.wp.com/www.watermeetsmoney.com/wp-content/uploads/2017/11/Header-background-2.png?ssl=1'}} style={Styles.headerBackImage} resizeMode={'cover'} ></Image>)
        }}
        ></Stack.Screen> 
        <Stack.Screen name='AddTaskPage' component={AddTaskPage} 
         options={{
          title:'Keep notes',
          headerTintColor:'#AEAEB3',
          headerTitleAlign:'center',
          headerTitleStyle:{fontWeight:'bold'},
          headerStyle:{backgroundColor:'#2E2E31', borderBottomColor:'#2E2E31'},
          //headerBackground:()=>(<Image source={{uri:'https://i0.wp.com/www.watermeetsmoney.com/wp-content/uploads/2017/11/Header-background-2.png?ssl=1'}} style={Styles.headerBackImage} resizeMode={'cover'} ></Image>)
        }}
        ></Stack.Screen> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}
