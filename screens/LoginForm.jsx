import React,{useState} from 'react'
import Axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { View,TextInput,Text,TouchableOpacity, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons';
import URLB from '../util'
export default function LoginForm({navigation}) {
   const [email,setEmail]=useState('');
   const [password,setPassword]=useState('');
  
    const setData=async(user)=>{
       
await  AsyncStorage.setItem("username",JSON.stringify(user.existingUser.name))
await  AsyncStorage.setItem("token",JSON.stringify(user.token))
    }
   


    const handleSubmit= async()=>{
        await Axios.post(`${URLB}/users/signin`,{email,password}).then(
            (response)=>{
                setData(response.data)
               
             setTimeout(()=>{navigation.navigate('home')},300)
            }
        ).catch((error)=>console.log(error.message))
    }
  return (
    <View style={styles.container}>

        <Text style={{textAlign:'center',fontSize:20,fontWeight:'700',padding:10,color:'#1A124A'}}>Login Form</Text>
        <View style={styles.group}>
        <MaterialIcons  style={styles.icon} name="email" size={24} color="black" />
        <TextInput
         name="email"
         value={email}
         placeholder='enter email'
         onChangeText={(val)=>setEmail(val)}
         style={styles.input}
        />
        </View>
          <View style={styles.group}>
          <FontAwesome style={styles.icon} name="lock" size={24} color="black" />
          <TextInput
         
         name="password"
         value={password}
         placeholder='enter password'
         onChangeText={(val)=>setPassword(val)}
         style={styles.input}
        />
          </View>
      
         <TouchableOpacity 
         onPress={handleSubmit}
          style={styles.button}
         >
            <Text style={{color:'#fff',textAlign:'center'}}>LOGIN</Text>
         </TouchableOpacity>
         <View style={styles.text}>
         <Text>Have no account? sign up</Text>
         <TouchableOpacity onPress={()=>navigation.navigate('login')}>
         <Text style={{color:'blue',paddingHorizontal:10}}>here</Text>
         </TouchableOpacity>
        
         </View>
    </View>
  )
}

const styles=StyleSheet.create({
    text:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        padding:10
       },
    input:{
        padding:5,
       
        // borderWidth:1,
        // borderColor:'#1A124A',
        

    },
    container:{
        flex:1,
        alignItems:'center',
        padding:10,
     
      
    },
    button:{
        backgroundColor:'#1A124A',
        padding:10,
        width:'80%',
        margin:10
    },
    icon:{
    padding:10
    },
    group:{
        width:'80%',
        marginVertical:10,
        borderWidth:1,
         borderColor:'#1A124A',
        flexDirection:'row',

    }
})
