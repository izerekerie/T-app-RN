import React from 'react'
import { View,Text , TouchableOpacity,StyleSheet} from 'react-native'
export default function Welcome({navigation}) {
  return (
 
  <View  style={styles.container} >
   
    <Text style={styles.text}>T-web</Text>

    <TouchableOpacity
     style={styles.button}
    onPress={()=>navigation.navigate('login')}
    >
    <Text style={{color:'#fff'}}>Get Started</Text>
    </TouchableOpacity>
    </View>
  )
}

const styles=StyleSheet.create({
    container:{
        backgroundColor:"#1A124A",
        flex:1,
      
        padding:12,
        alignItems:'center',
        justifyContent:'center'
      
    },
    text:{
        fontSize:30,
        color:"#fff",
        fontWeight:'bold',
       
    },
    button:{
      margin:20,
      borderColor:'#fff',
      padding:10,
      borderWidth:1,
      borderRadius:10,
    }
})