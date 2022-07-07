import React from 'react'
import { View ,Text,StyleSheet, TextInput,  TouchableOpacity } from 'react-native'
import { Formik } from 'formik'
import * as yup from 'yup'
import Axios from 'axios'
export default function DataForm({navigation}) {
const login=()=>{
    console.log("logggin")
      
    }
    const loginValidationSchema=yup.object().shape({
        email:yup.string()
        .email('Please Enter valid email')
        .required('Email is required'),
         password:yup.string().min(3,({min})=>`password muts be at least ${min} characters`).required('password is required')
    })
  return (
    <View style={styles.container}>
        
        <Text style={styles.header}>
        Login
        </Text>
        <Formik
        validationSchema={loginValidationSchema}
        initialValues={{email:'',password:''}}
        
        onSubmit={
          
            ()=>navigation.navigate('home')
        }
        >
          {({handleChange,handleSubmit,values,errors,isValid})=>(
            <>
            <TextInput 
            name="email" placeholder='Enter email' style={styles.textInput}
            onChangeText={handleChange('email')}
          
            value={values.email}
            keyboardType="email-address"
            
            />
            {errors.email && <Text style={{fontSize:12,color:'red'}}>{errors.email}</Text>}
              <TextInput
            name="password" placeholder='Enter password' style={styles.textInput}
            onChangeText={handleChange('password')}
          
            value={values.password}
            secureTextEntry
            
            />
            {errors.password && <Text style={{fontSize:12,color:'red'}}>{errors.password}</Text>}
            <TouchableOpacity
            onSubmit={handleSubmit}
            style={styles.button}>
                <Text style={{color:'#fff'}}>Submit</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <TouchableOpacity/> */}
            </>
          )}
        </Formik>
    </View>
  )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        padding:20
        

    },
    textInput:{
        borderColor:'#1A124A',
        borderWidth:1,
        padding:4,
        width:'100%',
        height:40,
        margin:10,
        borderRadius:10,
        padding:10
    },
    header:{
        padding:10,
        fontSize:20,
       color:'#1A124A',
       fontWeight:'bold'
    },
    button:{
        backgroundColor:'#1A124A',
        width:'100%',
        borderRadius:10,
        padding:10,
        alignItems:'center',
        margin:10
    }
})
