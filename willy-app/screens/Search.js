import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'

export default class Search extends React.Component{
  render(){
    return(
      <View style={styles.container}>
      <Text>search screen</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})