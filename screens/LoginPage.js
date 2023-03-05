import React,{useState, useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, ImageBackground, ActivityIndicator, SafeAreaView } from 'react-native';
import { Styles } from '../Styles';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//import firebase from 'firebase/compat';
import {firebase} from '../firebase';
import { MaterialIcons } from '@expo/vector-icons';

const Stack = createStackNavigator();

function MainLoginPage({navigation}){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);

  const showPassword=()=>{
    setSecure(!secure)
  }

  const handelLogin=()=>{
    if(email.length>0 && password.length>0 ){
      firebase.auth().signInWithEmailAndPassword(email, password)
    .then((data)=>{
      const user = data.user.email
      console.log('LogedIn with: ', user)
    }).catch((error)=>{
      alert(error.message)
    })
    }
    else{
      alert('Please fill all input Fields.')
    }
    
  }

  return(
    <SafeAreaView style={{flex:1}} >
      <View style={{height:80,}} >
          <View style={{...Styles.container, backgroundColor:'#2E2E31',}} >
          <Text style={{ fontWeight:'bold', fontSize:18, top:10, color:'#AEAEB3'}} >Keep notes</Text>
          </View>
      </View>

    <View style={{flex:1}} >
    <KeyboardAvoidingView style={{...Styles.container}} >
      <TextInput
      placeholder='Enter your Email'
      onChangeText={(val) => setEmail(val)}
      value={email}
      style={Styles.input}
      ></TextInput>

      <View style={{flexDirection:'row', width:'100%'}} >
      <TextInput
      placeholder='Enter your password'
      onChangeText={(val) => setPassword(val)}
      secureTextEntry={secure}
      value={password}
      style={Styles.passwordinput}
      ></TextInput>
      {secure?
      <MaterialIcons name="visibility-off" size={24} color="#AEAEB3" style={{alignSelf:'center', right:10}} onPress={showPassword} />
      :<MaterialIcons name="visibility" size={24} color="#AEAEB3" style={{alignSelf:'center', right:10}} onPress={showPassword} />}
      </View>

      <TouchableOpacity
      onPress={handelLogin}
      style={Styles.touchable}
      >
        <Text style={Styles.touchableText} >Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
      onPress={()=> navigation.replace('RegisterPage')}
      >
        <Text style={{color:'#AEAEB3'}} >New User?Register here.</Text>
      </TouchableOpacity>
     </KeyboardAvoidingView>
     </View>
     </SafeAreaView>
  )
}

function SplashScreenPage(){
  return(
    <SafeAreaView style={Styles.container} >
      <ActivityIndicator size={'large'}  ></ActivityIndicator>
     </SafeAreaView>
  )
}

export default function LoginPage({navigation}) {
  
  useEffect(()=>{
    const unsubscribe = firebase.auth().onAuthStateChanged((user)=>{
      try {
        if(user){
          navigation.replace('MainPage')
        }
        else{
          navigation.replace('MainLoginPage')
        }
      } catch (error) {
        alert(error.message)
      }
    })
    return unsubscribe;
  },[])

  return (
    <Stack.Navigator initialRouteName='SplashScreenPage' >
      <Stack.Screen name='SplashScreenPage' component={SplashScreenPage} 
      options={{
        headerShown:false,
      }}
      ></Stack.Screen>
      <Stack.Screen name='MainLoginPage' component={MainLoginPage} 
      options={{
        headerShown:false,
      }}
      ></Stack.Screen>

    </Stack.Navigator>
  );
}
