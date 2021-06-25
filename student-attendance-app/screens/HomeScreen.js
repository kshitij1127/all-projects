import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";

import { Header } from "react-native-elements";
import { SafeAreaProvider } from "react-native-safe-area-context";
import database from "../config";
import AttendanceScreen from "../screens/AttendanceScreen";

export default class Home extends React.Component {
  isPresentPressed = (students) => {
    var dbref = database.ref("students/" + students + "/");
    dbref.update({
      present: true,
    });
    console.log("present pressed");
  };

  isAbsentPressed = (students) => {
    var dbref = database.ref("students/" + students + "/");
    dbref.update({
      absent: true,
    });
    console.log("absent pressed");
  };

  goToAttendanceScreen = () => {
    this.props.navigation.navigate('AttendanceScreen');
  };

  render() {
    return (
      <SafeAreaProvider>
        <View>
          <Header
            centerComponent={{
              text: "Student Attendance App",
              style: { fontWeight: "bold" },
            }}
          ></Header>

          <View style={styles.direction}>
            <Text style={styles.textInput}>Student 1</Text>
            <TouchableOpacity
              style={styles.present}
              onPress={() => {
                this.isPresentPressed("student1");
              }}
            >
              present
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.present}
              onPress={() => {
                this.isAbsentPressed("student1");
              }}
            >
              absent
            </TouchableOpacity>
          </View>

          <View style={styles.direction}>
            <Text style={styles.textInput}>Student 2</Text>
            <TouchableOpacity
              style={styles.present}
              onPress={() => {
                this.isPresentPressed("student2");
              }}
            >
              present
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.present}
              onPress={() => {
                this.isAbsentPressed("student2");
              }}
            >
              absent
            </TouchableOpacity>
          </View>

          <View style={styles.direction}>
            <Text style={styles.textInput}>Student 3</Text>
            <TouchableOpacity
              style={styles.present}
              onPress={() => {
                this.isPresentPressed("student3");
              }}
            >
              present
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.present}
              onPress={() => {
                this.isAbsentPressed("student3");
              }}
            >
              absent
            </TouchableOpacity>
          </View>

          <View style={styles.direction}>
            <Text style={styles.textInput}>Student 4</Text>
            <TouchableOpacity
              style={styles.present}
              onPress={() => {
                this.isPresentPressed("student4");
              }}
            >
              present
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.present}
              onPress={() => {
                this.isAbsentPressed("student4");
              }}
            >
              absent
            </TouchableOpacity>
          </View>

          <View style={styles.direction}>
            <Text style={styles.textInput}>Student 5</Text>
            <TouchableOpacity
              style={styles.present}
              onPress={() => {
                this.isPresentPressed("student5");
              }}
            >
              present
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.present}
              onPress={() => {
                this.isAbsentPressed("student5");
              }}
            >
              absent
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.present}
            onPress={() => {
              this.goToAttendanceScreen();
            }}
          >
            Attendace Screen
          </TouchableOpacity>
        </View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    marginTop: 120,
    width: "80%",
    alignSelf: "center",
    height: 40,
    textAlign: "center",
    fontFamily: "Cascadia Code",
  },

  present: {
    alignSelf: "center",
    marginTop: 100,
    fontSize: 20,
    borderWidth: 5,
    borderColor: "black",
    padding: 10,
    backgroundColor: "turquoise",
    borderRadius: 15,
    outline: "none",
    fontFamily: "Inconsolata",
    fontWeight: "bold",
  },

  direction: {
    flexDirection: "row",
  },

  text: {
    marginTop: 100,
    alignSelf: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
});
