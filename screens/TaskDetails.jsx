import React from 'react'
import { View ,TextInput,StyleSheet,Text} from 'react-native'
import {Entypo} from '@expo/vector-icons'
export default function TaskDetails({navigation,route}) {
  return (
    <View style={styles.container}>
<Entypo style={{padding:10}} onPress={()=>navigation.navigate('home')} name="home" size={24} color="#fff" />
        <View style={styles.box} >
           <Text style={{fontWeight:'bold',fontSize:18}}>{route.params?.title}</Text>
           <Text style={{fontWeight:'600',fontSize:14}} >{route.params?.category}</Text>
           <Text style={{fontWeight:'bold',fontSize:14}}>{route.params?.createdBy}</Text>
        </View>
    </View>
  )
}

const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#1A124A",
    
  },
  box:{
    padding:10,
    alignItems:'center',
    alignContent:'center',
    borderTopRightRadius:60,
    borderTopLeftRadius:60,
  position:'absolute',
  backgroundColor:'#fff',
  height:100,
  top:100,
  height:'100%', 
  width:'100%'
  }
})