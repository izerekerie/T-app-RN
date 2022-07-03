import React,{useState,useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { View,TextInput, Text,StyleSheet ,TouchableOpacity} from 'react-native'
import Axios  from 'axios'
import URLB from '../util'
export default function AddCategory({navigation}) {
    const [name,setCategory]=useState(null);
    const [createdBy,setCreator]=useState(null);

    var user='';

    useEffect(()=>{
      const getUser=async()=>{
        user=await AsyncStorage.getItem("username");
      }
        getUser();
    })
    const handleSubmit=async()=>{
      console.log("url:",URLB);
        setCreator(user);
    await  Axios.post(`${URLB}/categories`,{name,createdBy})
    .then((res)=> {
        setTimeout(()=>{navigation.navigate('home',{reload:res.data._id})},300)
    }).catch((err)=>{
        console.log(err)
    })
    }
  return (
    <View style={styles.container}>
    <TextInput
     style={styles.input}
     placeholder="Enter name of category"
     name="name"
     value={name}
     onChangeText={(val)=>setCategory(val)}
     keyboardType='default'
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
},
container:{
  flex:1,
  alignItems:'center'
}
})
 
