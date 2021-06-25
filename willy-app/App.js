import React from 'react'
import {View, TouchableOpacity, StyleSheet, Text, Image} from 'react-native'
import Search from './screens/SearchScreen'
import Book from './screens/BookTransactionScreen'
import {createAppContainer} from 'react-navigation'
import {createBottomTabNavigator} from 'react-navigation-tabs'

export default class App extends React.Component{
  render(){
    return(
    <AppContainer />
    )
  }
}

const TabNavigator = createBottomTabNavigator({
  Transaction: {screen: Book},
  Search: {screen: Search},
},
{
  defaultNavigationOptions: ({navigation}) => ({
    tabBarIcon: ({}) => {
      const route = navigation.state.routeName
      if(route === 'Transaction'){
        return(
          <Image source={
            require("./assets/book.png")
          } style={{
            width: 40,
            height: 40,
          }}/>
        )
      }else if(route === 'Search'){
        return(
          <Image source={
            require("./assets/searchingbook.png")
          } style={{
            width: 40,
            height: 40,
          }}/>
        )
      }
    }
  })
})

const AppContainer = createAppContainer(TabNavigator)