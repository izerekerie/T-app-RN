import { useState } from 'react';
import Home from './screens/Home';
import LoginForm from './screens/LoginForm';
import Welcome from './screens/Welcome';
import Category from './screens/Category';
import AddCategory from './screens/AddCategory';
import TaskDetails from './screens/TaskDetails';
import Signup from './screens/Signup';
import AddTask from './screens/AddTask';
import EditTask from './screens/EditTask';
import DataForm from './screens/DataForm';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
const Stack =createNativeStackNavigator();

export default function App() {
const [token,setToken]=useState();
const getToken=async()=>{
 const tok=await AsyncStorage.getItem('token');
 setToken(JSON.parse(tok))
}
getToken();
  return (
   <NavigationContainer>
    <Stack.Navigator  initialRouteName='form' >
      <Stack.Screen component={Welcome} name="welcome" options={{headerShown:false}}/>
      <Stack.Screen component={Signup} name='signup' options={{headerShown:false}}/>
      <Stack.Screen component={Home} name='home' options={{headerShown:false}} />
      <Stack.Screen component={LoginForm} name="login" options={{headerShown:false}} />
      <Stack.Screen component={TaskDetails}  options={{headerShown:false}} name='task' />
      <Stack.Screen component={AddTask} name='addTask' />
      <Stack.Screen component={EditTask} name='editTask' />
      <Stack.Screen component={AddCategory} name="addCategory"/>
      <Stack.Screen  component={Category} name='category'/>
      <Stack.Screen component={DataForm} name='form' />
    </Stack.Navigator>
   </NavigationContainer>
  );
}


