import * as React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Audio } from "expo-av";

export default class Phonicsoundbutton extends React.Component {
  playSound = async (soundchunk) => {
    var soundlink =
      "https://s3-whitehatjrcontent.whjr.online/phones/" + soundchunk + ".mp3";
    await Audio.Sound.createAsync({ uri: soundlink }, { shouldPlay: true });
  };

  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            this.playSound(this.props.soundchunk);
          }}
          style={styles.chunkButton}
        >
          <Text style={styles.displayText}>{this.props.wordchunk}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  displayText: 
  { textAlign: "center", fontSize: 30, color: "white" },
  chunkButton: {
    width: "60%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 10,
    margin: 5,
    backgroundColor: "red",
  },
});
