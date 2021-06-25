import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Header } from "react-native-elements";
import { TextInput } from "react-native";
import personData from "./persondata";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      text: "",
      data1: [],
      data2: [],
      data3: [],
      data4: [],
      data5: [],
    };
  }

  render() {
    return (
      <SafeAreaProvider>
        <View>
          <Header
            centerComponent={{
              text: "Family Profile App",
            }}
          />

          <TextInput
            onChangeText={(text) => {
              this.setState({
                text: text,
              });
            }}
            value={this.state.person}
            style={styles.input}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.setState({
                data1: personData[this.state.text].surname,
                data2: personData[this.state.text].phoneNumber,
                data3: personData[this.state.text].DOB,
                data4: personData[this.state.text].sports,
                data5: personData[this.state.text].hobbies,
              });
            }}
          >
            View the person's data
          </TouchableOpacity>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginTop: 100,
            }}
          >
            <View>
              {this.state.data1.map((index) => {
                return <Text>surname: {index}</Text>;
              })}
            </View>

            <View>
              {this.state.data2.map((index) => {
                return <Text>contact: {index}</Text>;
              })}
            </View>

            <View>
              {this.state.data3.map((index) => {
                return <Text>DOB: {index}</Text>;
              })}
            </View>

            <View>
              {this.state.data4.map((index) => {
                return <Text>sports: {index}</Text>;
              })}
            </View>

            <View>
              {this.state.data5.map((index) => {
                return <Text>hobbies: {index}</Text>;
              })}
            </View>
          </View>
        </View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    marginTop: 50,
    width: "80%",
    alignSelf: "center",
    height: 50,
    textAlign: "center",
    borderWidth: 4,
    outline: "none",
    fontSize: 16,
  },

  button: {
    padding: 10,
    fontSize: 24,
    fontFamily: "Consolas",
    fontWeight: "bold",
    borderRadius: 15,
    borderWidth: 4,
    outline: "none",
    marginTop: 50,
    width: "50%",
    alignContent: "center",
    alignSelf: "center",
    textAlign: "center",
  },
});
