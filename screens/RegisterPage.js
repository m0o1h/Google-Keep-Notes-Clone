import React,{useState, useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, ImageBackground } from 'react-native';
import { Styles } from '../Styles';
import { useNavigation } from '@react-navigation/native';
//import firebase from 'firebase/compat';
import {firebase} from '../firebase';
import { MaterialIcons } from '@expo/vector-icons';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);
  const userRef = firebase.firestore().collection('users');
  //const authRef = firebase.auth().currentUser.uid;


  const navigation = useNavigation();

  const showPassword=()=>{
    setSecure(!secure)
  }

  useEffect(()=>{
    const unsubscribe = firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        // user.sendEmailVerification()
        // .then(()=>{
        //   console.log('Email Sent')
        // }).catch((error)=>{
        //   console.log(error.message)
        // })
        navigation.replace('MainPage')
      }
    })
    return unsubscribe;
  },[])


  const handelRegister=()=>{
    if(email.length && password.length && name.length && age.length>0){
      firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((data)=>{
      const user = data.user.email
      const timestamp = firebase.firestore.FieldValue.serverTimestamp()
        const info = {
          createdAt:timestamp,
          name:name,
          age:age,
          email:email,
        }
        userRef.add(info)
      console.log('Registered with: ', user)
    }).catch((error)=>{
      console.log(error.message)
    })
    }
    else{
      alert('Please fill all input Fields.')
    }
  }

  const userDetails=()=>{
    if(email.length && password.length && name.length && age.length>0){
    try {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp()
        const info = {
          createdAt:timestamp,
          name:name,
          age:age,
          email:email,
        }
        userRef.add(info)
         {handelRegister}
    } catch (error) {
      console.log(error.message)
    }
  }
  }

  return (
    <KeyboardAvoidingView style={{...Styles.container}} >
    <TextInput
      placeholder='Enter your Name'
      onChangeText={(val) => setName(val)}
      value={name}
      style={Styles.input}
      ></TextInput>
      <TextInput
      placeholder='Enter your Age'
      onChangeText={(val) => setAge(val)}
      value={age}
      style={Styles.input}
      ></TextInput>
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
      onPress={handelRegister}    
      style={Styles.touchable}
      >
        <Text style={Styles.touchableText} >Register</Text>
      </TouchableOpacity>

      <TouchableOpacity
      onPress={()=> navigation.replace('LoginPage')}
      >
        <Text style={{color:'#AEAEB3'}} >Already Registered?Login here.</Text>
      </TouchableOpacity>
     </KeyboardAvoidingView>
  );
}
