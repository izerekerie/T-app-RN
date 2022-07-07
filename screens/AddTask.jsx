import React,{useState,useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { View,TextInput, Text,StyleSheet ,TouchableOpacity} from 'react-native'
import Axios  from 'axios'
import URLB from '../util'
export default function AddTask({navigation}) {
  const [title,setTilte]=useState('')
  const [category,setCategory]=useState('')
  const [createdBy,setCreator]=useState(null)
  const [categories,setCats]=useState([]);
  const [token,setToken]=useState('')

  const getAllCategories=async()=>{
    const user=await AsyncStorage.getItem('username');
    const token=await AsyncStorage.getItem('token')
   setCreator(JSON.parse(user));
   setToken(JSON.parse(token))
    await  Axios.get(`${URLB}/categories`).then((response)=>{
        setCats(response.data);
       }).catch((error)=>console.log("error ",error.message))
   }
  
 const handleSubmit= async(e)=>{
 console.log("token",token)

  await Axios.post(`${URLB}/tasks`,{title,category,createdBy},{
    headers:{
    "Authorization":`Bearer ${token}`
  
  }})
  .then((res)=>{
   setTimeout(()=>{navigation.navigate('home',{reload:res.data._id})},500)

  }).catch((err)=>{
    console.log(err)
  })
 }


   useEffect(()=>{
    getAllCategories();
   },[])
   console.log("categories:",categories)
  return (
    <View style={styles.container}>
    <TextInput
     style={styles.input}
     placeholder="Enter title of task"
     name="title"
     value={title}
     onChangeText={(val)=>setTilte(val)}
    />
      <TextInput
     style={styles.input}
     placeholder="Enter category of task"
     name="category"
     value={category}
     onChangeText={(val)=>setCategory(val)}
    />
    <TouchableOpacity
    onPress={handleSubmit}
    style={styles.button}
    >
      <Text style={{color:'#fff',fontSize:12,textAlign:'center'}}>Submit</Text>
    </TouchableOpacity>
    </View>
  )
}

const styles=StyleSheet.create({

  container:{
      flex:1,
      alignItems:'center',
      padding:20
      
  },
  input:{
    padding:10,
    width:'80%',
    borderWidth:1,
    borderColor:'#1A124A',
    margin:10

},
button:{
  backgroundColor:'#1A124A',
  padding:10,
  width:'80%',
  margin:10
}
})