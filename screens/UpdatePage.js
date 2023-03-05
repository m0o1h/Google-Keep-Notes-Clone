import React,{useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, TextInput, Modal, KeyboardAvoidingView} from 'react-native';
import { Styles } from '../Styles';
import {firebase} from '../firebase';
import { Ionicons } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

export default function UpdatePage({navigation, route}) {
  const [datatoupdate, setdatatoupdate] = useState(route.params.item.heading);
  const [color, setColor] = useState(route.params.item.backgroundColor);
  const [visible, setVisible] = useState(false);
  const todoRef = firebase.firestore().collection('todos');

  const showModal=()=>{
    setVisible(!visible)
  }

  const updateTask=()=>{
    if(datatoupdate && datatoupdate.length>0 ){
      const timestamp = firebase.firestore.FieldValue.serverTimestamp()
      todoRef.doc(route.params.item.id).update({
        heading:datatoupdate,
        backgroundColor:color,
        createdAt:timestamp,
      }).then(()=>{
        navigation.navigate('MainPage')
      }).catch((error)=>{
        console.log(error.message)
      })
    }
  }


  return (
    <View style={{...Styles.inputcontainer, backgroundColor:color,}}>
      <View style={{flex:1, width:'100%',}}>
      <TextInput
      placeholder='Add Task'
      onChangeText={(val)=>setdatatoupdate(val)}
      value={datatoupdate}
      multiline={true}
      placeholderTextColor={'#A5A5A5'}
      style={{...Styles.todoinput, backgroundColor:color,}}
      ></TextInput>
      </View>

      <View style={{width:'90%',flexDirection:'row', justifyContent:'space-between'}} >
      <View style={{width:'30%',flexDirection:'row', justifyContent:'space-around'}} >
      <TouchableOpacity
      onPress={showModal}
      style={{...Styles.todoinputcolorplate,}}
      >
        <Ionicons name="color-palette" size={30} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
      onPress={()=>alert('Reminders-Working on it.')}
      style={{...Styles.todoinputcolorplate,}}
      >
        <FontAwesome name="bell" size={30} color="white" />      
      </TouchableOpacity>
      </View>
      <TouchableOpacity
      onPress={updateTask}
      style={{...Styles.todoinputtouchable,}}
      >
        <Text style={Styles.touchableText} >Update Task</Text>
      </TouchableOpacity>
      <Modal
      visible={visible}
      animationType={'fade'}
      transparent={true}
      >
        <View style={Styles.modalcontainer} >
            <TouchableOpacity
                onPress={()=>setColor("#252527")}
                style={{...Styles.modaltouchable, backgroundColor:'#252527'}}
            ></TouchableOpacity>
            <TouchableOpacity
                onPress={()=>setColor("#FA8072")}
                style={{...Styles.modaltouchable, backgroundColor:'#FA8072'}}
            ></TouchableOpacity>
            <TouchableOpacity
                onPress={()=>setColor("#0E6251")}
                style={{...Styles.modaltouchable, backgroundColor:'#0E6251'}}
            ></TouchableOpacity>
            <TouchableOpacity
                onPress={()=>setColor("#9FE2BF")}
                style={{...Styles.modaltouchable, backgroundColor:'#9FE2BF'}}
            ></TouchableOpacity>
            <TouchableOpacity
                onPress={()=>setColor("#CCCCFF")}
                style={{...Styles.modaltouchable, backgroundColor:'#CCCCFF'}}
            ></TouchableOpacity>
            <TouchableOpacity
                onPress={()=>setColor("#7D6608")}
                style={{...Styles.modaltouchable, backgroundColor:'#7D6608'}}
            ></TouchableOpacity>
            <TouchableOpacity
                onPress={()=>setVisible(!visible)}
                style={{...Styles.modaltouchable, }}
            >
                <MaterialIcons name="done" size={40} color="white" />
            </TouchableOpacity>
        </View>
      </Modal>
      </View>

     </View>
  );
}
