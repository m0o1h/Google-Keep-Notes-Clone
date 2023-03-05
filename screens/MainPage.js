import React,{useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, PanResponder, Animated, Image } from 'react-native';
import {firebase} from '../firebase';
import { Styles } from '../Styles';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
//import Swipeable from 'react-native-gesture-handler/Swipeable';

const Tab = createBottomTabNavigator();

function HomeScreen({navigation}){
  const [todos, setTodos] = useState([]);
  const [addData, setAddData] = useState('');
  const todoRef = firebase.firestore().collection('todos');
  const authRef = firebase.auth().currentUser.uid;

  useEffect(()=>{
    const unsubscribe = todoRef
    .orderBy('createdAt', 'desc')
    .onSnapshot((querySnapshot)=>{
      const todosfetchecd = []
      querySnapshot.forEach((doc)=>{
        const {heading} =doc.data()
        const {backgroundColor} = doc.data()
        const {userId} = doc.data()
        if(userId===authRef){  
          todosfetchecd.push({
            id:doc.id,
            heading,
            backgroundColor,
            userId,
          })
        }
      })
      setTodos(todosfetchecd)
    })
    return unsubscribe;
  },[])

  const deleteTask=(item)=>{
    todoRef.doc(item.id).delete()
    .then(()=>{
      //alert('Item deleted Successfully')
    }).catch((error)=>{
      console.log(error.message)
    })
  }

  //for animation on floating action button
  // const pan = useState(new Animated.ValueXY())[0];
  // const panResponder = useState(
  //   PanResponder.create({
  //     onMoveShouldSetPanResponder: () => true,
  //     onPanResponderGrant: ()=>{
  //       pan.setOffset({
  //         x: pan.x._value,
  //         y: pan.y._value,
  //       })
  //     },
  //     onPanResponderMove:(_, gesture) =>{
  //       pan.x.setValue(gesture.dx)
  //       pan.y.setValue(gesture.dy)
  //     },
  //     onPanResponderRelease: () => {
  //       pan.flattenOffset();
  //     },
  //   }),
  // )[0];


  return(
      <View style={Styles.flatlistoutercontainer} >
      <FlatList
      data={todos}
      style={Styles.flatlist}
      renderItem={({item})=>{
        return(
          <View style={Styles.flatlistinnercontainer} >
          <TouchableOpacity 
          onPress={()=>navigation.navigate('UpdatePage',{item})}
          style={{...Styles.flatlisttouchable, backgroundColor:item.backgroundColor}}
          >
            <Text style={Styles.flatlisttext} >{item.heading}</Text>
          </TouchableOpacity>
          <AntDesign name="delete" size={24} color="white" onPress={()=>deleteTask(item)} style={Styles.flatlistdeleteicon} />
        </View>
        )
      }}
      ></FlatList>

      {/* <Animated.View
      style={[{flex:1,alignSelf:'flex-end', width:'30%', height:'30%'},pan.getLayout()]}
      {...panResponder.panHandlers}
      > */}
      <TouchableOpacity
        style={Styles.floatingbutton}
        onPress={() => navigation.navigate('AddTaskPage')}
      >
        <Image source={{uri:'https://cdn-icons-png.flaticon.com/512/6276/6276237.png'}} style={{height:30, width:30}} resizeMode='contain' ></Image>
      </TouchableOpacity>
      {/* </Animated.View> */}
     </View>
  )
}

function SettingsScreen({navigation}) {
  const userRef = firebase.firestore().collection('users');
  const authRef = firebase.auth().currentUser.email;
  const [users, setUsers] = useState([]);

  useEffect(()=>{
    const unsubscribe = userRef
    .orderBy('createdAt', 'desc')
    .onSnapshot((querySnapshot)=>{
      const users = []
      querySnapshot.forEach((doc)=>{
        const {name} = doc.data()
        const {age} = doc.data()
        const {email} = doc.data()
        if(email===authRef){
          users.push({
            id:doc.id,
            name,
            age,
            email,
          })
        }
      })
      setUsers(users)
    })
    return unsubscribe;
  },[])

  const signOut=()=>{
    console.log('SignedOut from: ', firebase.auth().currentUser.email)
    firebase.auth().signOut()
    .then(()=>{
      navigation.replace('LoginPage')
    }).catch((error)=>{
      alert(error.message)
    })
  }

  return (
    <View style={Styles.container} >
      <Text style={Styles.settingstext} >Name: {users.name}</Text>
      <Text style={Styles.settingstext} >Age: {users.age}</Text>
      <Text style={Styles.settingstext} >Email: {authRef}</Text>
      <Text style={Styles.settingstext} >Theame</Text>
      <Text style={Styles.settingstext} >Account</Text>
      <TouchableOpacity
      style={{...Styles.touchable,}}
      onPress={signOut}
      >
        <Text style={Styles.touchableText} >SignOut</Text>
      </TouchableOpacity>
     </View>
  );
}


export default function MainPage({navigation, name, age, email}) {

  useEffect(()=>{
    try {
      if(firebase.auth().currentUser.emailVerified===false){
        alert('Please Verify Your Email to move to Home Page.')
        firebase.auth().currentUser.sendEmailVerification()
        .then(()=>{
          console.log('Email Sent')
        }).catch((error)=>{
          console.log(error.message)
        })
        console.log('SignedOut from: ', firebase.auth().currentUser.email)
        firebase.auth().signOut()
        .then(()=>{
          navigation.replace('LoginPage')
        }).catch((error)=>{
          alert(error.message)
        })
      }
    } catch (error) {
      alert(error.message)
    }
  },[firebase.auth().currentUser.emailVerified])

  return (
      <Tab.Navigator initialRouteName='HomeScreen' >
        <Tab.Screen name="Home" component={HomeScreen} 
        options={{
          headerShown:false,
          tabBarActiveTintColor:'tomato',
          tabBarInactiveTintColor:'grey',
          tabBarInactiveBackgroundColor:'#2E2E31',
          tabBarActiveBackgroundColor:'#2E2E31',
          tabBarStyle:{borderTopColor:'#252527'},
          tabBarIcon:({focused, color, size })=>(<Entypo name="home" size={20} color={color} />),
        }}
        />
        <Tab.Screen name="Settings" component={SettingsScreen}
        options={{
          headerShown:false,
          tabBarActiveTintColor:'tomato',
          tabBarInactiveTintColor:'grey',
          tabBarInactiveBackgroundColor:'#2E2E31',
          tabBarActiveBackgroundColor:'#2E2E31',
          tabBarStyle:{borderTopColor:'#252527'},
          tabBarIcon:({color})=>(<Ionicons name="settings" size={20} color={color} />),
        }}
        />
      </Tab.Navigator>
  );
}
