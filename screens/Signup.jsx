import { View, Text,StyleSheet,TextInput,TouchableOpacity } from 'react-native'
import React,{  useState} from 'react'
import URLB from '../util';
import Axios from 'axios';
const Signup = ({navigation}) => {
    const [email,setEmail]=useState('');
   const [password,setPassword]=useState('');
  const [name,setName]=useState('');

const setData=async(user)=>{
       
await  AsyncStorage.setItem("username",JSON.stringify(user.existingUser.name))
await  AsyncStorage.setItem("token",JSON.stringify(user.token))
    }
   


    const handleSubmit= async()=>{
        await Axios.post(`${URLB}/users/signup`,{name,email,password}).then(
            (response)=>{
                setData(response.data)
               
             setTimeout(()=>{navigation.navigate('home')},300)
            }
        ).catch((error)=>console.log(error.message.details[0]))
    }
  return (
    <View>
      
      <Text style={{textAlign:'center',fontSize:20,fontWeight:'700',padding:10,color:'#1A124A'}}>Sign up </Text>
      <TextInput
         name="name"
         value={name}
         placeholder='enter name  '
         onChangeText={(val)=>setName(val)}
         style={styles.input}
        />
        <TextInput
         name="email"
         value={email}
         placeholder='enter email'
         onChangeText={(val)=>setEmail(val)}
         style={styles.input}
        />
         <TextInput
         
         name="password"
         value={password}
         placeholder='enter password '
         onChangeText={(val)=>setPassword(val)}
         style={styles.input}
        />
         <TouchableOpacity 
         onPress={handleSubmit}
          style={styles.button}
         >
            <Text style={{color:'#fff',textAlign:'center'}}>Sign Up</Text>
         </TouchableOpacity>
         <View style={styles.text}>
         <Text>Already Sign Up? Login</Text>
         <TouchableOpacity onPress={()=>navigation.navigate('login')}>
         <Text style={{color:'blue',paddingHorizontal:10}}>here</Text>
         </TouchableOpacity>
        
         </View>
    </View>
  )
}

export default Signup

const styles=StyleSheet.create({
    text:{
     flexDirection:'row',
     alignItems:'center',
     justifyContent:'center',
     padding:10
    },
    input:{
        padding:10,
        width:'80%',
        borderWidth:1,
        borderColor:'#1A124A',
        margin:10

    },
    container:{
        flex:1,
        alignItems:'center',
        padding:10,
        justifyContent:'center',
      
    },
    button:{
        backgroundColor:'#1A124A',
        padding:10,
        width:'80%',
        margin:10
    }
})