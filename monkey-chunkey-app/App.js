import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { Header } from "react-native-elements";
import db from "./Localdb";
import {
  SafeAreaProvider,
  safeAreaProvider,
} from "react-native-safe-area-context";
import Phonicsoundbutton from './PhonicSoundButton'

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      text: "",
      chunks: [],
      phonicSound: [],
    };
  }
  render() {
    return (
      <SafeAreaProvider>
        <View style={styles.container}>
          <Header
            backgroundColor={"#9c8210"}
            centerComponent={{
              text: "Monkey Chunky",
              style: { color: "#fff", fontSize: 20 },
            }}
          />

          <Image
            style={styles.imageIcon}
            source={{
              uri: "https://www.shareicon.net/data/128x128/2015/08/06/80805_face_512x512.png",
            }}
          />

          <TextInput
            style={styles.inputBox}
            onChangeText={(text) => {
              this.setState({ text: text });
            }}
            value={this.state.text}
          />
          <TouchableOpacity
            style={styles.goButton}
            onPress={() => {
              db[this.state.text]?(
              this.setState({ chunks: db[this.state.text].chunks }),
              this.setState({ phonicSound: db[this.state.text].phones })
              ) : 
              alert('this word does not exist in the database')
            }}
          >
            <Text style={styles.buttonText}>GO</Text>
          </TouchableOpacity>

          <View>
            {this.state.chunks.map((item, index) => {
              return (
                <Phonicsoundbutton
                  wordchunk={this.state.chunks[index]}
                  soundchunk={this.state.phonicSound[index]}
                />
              );
            })}
          </View>
        </View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#b8b8b8",
  },
  inputBox: {
    marginTop: 100,
    width: "80%",
    alignSelf: "center",
    height: 40,
    textAlign: "center",
    borderWidth: 4,
    outline: "none",
  },
  goButton: {
    width: "50%",
    height: 55,
    alignSelf: "center",
    padding: 10,
    margin: 10,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  displayText: {
    textAlign: "center",
    fontSize: 30,
  },

  imageIcon: {
    width: 150,
    height: 150,
    marginLeft: 95,
  },

  chunkButton: {
    width: "60%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 18,
    margin: 5,
    backgroundColor: "red",
  },
});
