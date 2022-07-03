import React ,{useEffect, useState}from 'react'
import { View ,SafeAreaView,Text,StyleSheet,FlatList,TouchableOpacity, Image} from 'react-native'
import { Ionicons } from '@expo/vector-icons'; 
import Axios from 'axios'
import URLB from '../util'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
export default function Home({navigation, route}) {
  const reload = route.params?.reload
  const [cats,setCats]=useState([]);
  const [tasks,setTasks]=useState([])
  const [username,setUsername]=useState('');
  const [token,setToken]=useState('');



 
 const getAllCategories=async()=>{
  const token=await AsyncStorage.getItem("token");
    setToken(JSON.parse(token))
  const user =await AsyncStorage.getItem("username");
  setUsername(JSON.parse(user));
  await  Axios.get(`${URLB}/categories`).then((response)=>{
      setCats(response.data);
     }).catch((error)=>console.log("error ",error.message))
 }
 const getAllTasks=async()=>{
  await  Axios.get(`${URLB}/tasks`).then((response)=>{
      setTasks(response.data);
     
     }).catch((error)=>console.log(error.message))
 }

const handleDelete=(id)=>{
Axios.delete(`${URLB}/tasks/${id}`,{
  headers:{
    "Authorization":`Bearer ${token}`
  }
}).then((res)=>{
  setTimeout(()=>{navigation.navigate('home',{reload:res.data})},300)
})
}

const handleLogout=async()=>{
  await AsyncStorage.clear();
  navigation.navigate('login');
}

  useEffect(()=>{

    getAllCategories();
    getAllTasks()
   
  },[reload])
console.log("second",tasks)
console.log("user home",username)
  return (
    <View style={{flex:1,marginTop:20}}>
     <View style={styles.header}>
      <View style={{padding:3,marginLeft:20,flexDirection:'row'}}>
        <Text style={{fontSize:18,fontWeight:'400',color:'#fff'}}>Welcome</Text>
        <Text style={{fontSize:18,color:'#fff',fontWeight:'bold',paddingLeft:10}}>{username}</Text>
      </View>

     <MaterialIcons onPress={handleLogout} name="logout" size={24} color="#fff" />
     </View>
   
      <Text style={styles.title}>Categories</Text>
  <View style={styles.listC}>

   <TouchableOpacity
     onPress={()=>navigation.navigate('addCategory')}
   style={styles.square}>
    <Ionicons name="add-outline" size={24} color="white" />
    </TouchableOpacity>

         <FlatList
         data={cats}
         horizontal
         keyExtractor={cat => cat._id}
         renderItem={({item})=>{
           return(
            <TouchableOpacity onPress={()=>navigation.navigate('Category',{category:item})}  style={styles.square}>
           <Text style={{color:'#fff',fontWeight:'bold'}}>{item.name}</Text>
           </TouchableOpacity>
         )

        }}

         />
          

        </View>
       <View style={{width:'80%',flexDirection:'row',justifyContent:'space-between'}}>
       <Text style={styles.title}>Tasks</Text>
       <TouchableOpacity
       onPress={()=>navigation.navigate('addTask')}
        style={styles.add}
       >
        <Text style={{color:'#fff',fontSize:8,textAlign:'center'}}>Add task</Text>
       </TouchableOpacity>
       </View>
      

      <View style={{margin:20}}>
         <FlatList
         data={tasks}
         keyExtractor={item=>item._id}
         renderItem={({item})=>{
          return(
          <TouchableOpacity
         
       
          style={[styles.task,styles.shadowStyle]}>

            <Text style={{width:'70%'}}>{item.title}</Text>
            <View style={{width:'30%',flexDirection:'row',justifyContent:'space-around'}}>

            <MaterialIcons
                 onPress={()=>navigation.navigate('task',{
                  title:item.title,
                  category:item.category,
                  createdBy:item.createdBy
                })}
             name="remove-red-eye" size={16} color="#1A124A" />
            <MaterialIcons onPress={()=>navigation.navigate('editTask',{
              id:item._id,
               title:item.title,
               category:item.category,
               createdBy:item.createdBy
            })} name="mode-edit" size={16} color="green" />
        
            <MaterialIcons onPress={()=>handleDelete(item._id)} name="delete" size={16} color="red" />
          
          
         
            </View>
          </TouchableOpacity>
         )}}
         />
      </View>
    </View>
  
  )
}

const  styles=StyleSheet.create({
  container:{
    flex:1
  },
  header:{
    backgroundColor:'#1A124A',
    flexDirection:'row',
    padding:10,
    justifyContent:'space-between'
  },
  shadowStyle:{
    shadowColor:'#1A124A',
    shadowRadius:3,
    shadowOffset:{width:-2,height:5},
    shadowOpacity:0.1,
  },
  listC:{
    flexDirection:'row',
    padding:10,
    marginBottom:10
  },
 
  task:{
    width:'80%',
    flexDirection:'row',
  
  // elevation: 20,
  //   shadowColor: '#52006A',
    borderLeftColor:'#1A124A',
    borderLeftWidth:4,
    margin:10,
    padding:10
  },
  title:{
    fontSize:14,
    fontWeight:'600',
    padding:10,
    paddingLeft:20
  },
  square:{
    margin:10,
    padding:10,
    justifyContent:'center',
    alignItems:'center',
    width:80,
    height:80,
    backgroundColor:'#1A124A',
    borderRadius:10,
    
  },
  add:{
    width:60,
    height:25,
    borderRadius:5,
    padding:6,
    backgroundColor:'#1A124A'}
})
