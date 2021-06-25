import React from "react";
import { TouchableOpacity } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import database from "../config";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Header } from "react-native-elements";

export default class AttendanceScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      presentStudent: [],
      absentStudent: [],
    };
  }

  displayPresent = () => {
    var present = [];
    var absent = [];
    var dbref = database.ref("students/");
    dbref.on("value", (data) => {
      var studentattendance = data.val();
      for (var student in studentattendance) {
        if (studentattendance[student]['present'] === true) {
          studentattendance[student]['present'] = student;
          console.log('student')
          present.push(studentattendance[student]);
        } else if (studentattendance[student]['absent'] === true) {
          studentattendance[student]['absent'] = student;
          absent.push(studentattendance[student]);
        }
      }

      this.setState({
        presentStudent: present,
        absentStudent: absent
      })

    });
  };

  componentDidMount() {
    this.displayPresent();
  }

  resetdb = () => {
    var resetdata = database.ref("students/").set({
      student1: {
        present: false,
        absent: false,
      },

      student2: {
        present: false,
        absent: false,
      },

      student3: {
        present: false,
        absent: false,
      },

      student4: {
        present: false,
        absent: false,
      },

      student5: {
        present: false,
        absent: false,
      },
    });
  };

  goToHomeScreen = () => {
    this.props.navigation.navigate("HomeScreen");
  };

  render() {
    return (
      <SafeAreaProvider>
             <View>
            <Header
              backgroundColor={"turquoise"}
              centerComponent={{
                style: {
                  fontSize: 24,
                  fontWeight: "bold",
                  alignItems: "center",
                  alignSelf: "center",
                },
                text: "Attendance Screen",
              }}
            />
          </View>

          <View>

        <View style={{
          flexDirection: 'row',
          marginTop: 50,
          alignSelf: 'center'
        }}>

          <View style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            margin: 10,
            borderWidth: 5,
            padding: 20,
            backgroundColor: 'green'
          }}>
            {this.state.presentStudent.map((students) => (
              <Text style={styles.displayText}>Present : {students.present}</Text>
            ))}
        </View>

        <View style={{
          flexDirection: 'column',
          justifyContent: 'space-between',
          marginTop: 50,
          margin: 10,
          borderWidth: 5,
          padding: 20,
          backgroundColor: 'green'
        }}>
            {this.state.absentStudent.map((students) => (
              <Text style={styles.displayText}>Absent : {students.absent}</Text>
            ))}
          </View>
          </View>
         
            <TouchableOpacity style={styles.button} onPress={ ()=> {
              this.resetdb()
            }}>
              reset the database
            </TouchableOpacity>
        

          <View>
            <TouchableOpacity
              style={styles.button2}
              onPress={this.goToHomeScreen}
            >
              go back
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  displayText: {
    justifyContent: "center",
    alignSelf: "center",
    fontSize: 24,
  },

  button: {
    marginTop: 350,
    alignSelf: "center",
    justifyContent: "center",
    fontSize: 24,
    fontFamily: "Verdana",
    fontWeight: "bold",
    borderRadius: 15,
    borderWidth: 2,
    padding: 15,
    backgroundColor: "turquoise",
  },

  button2: {
    marginTop: 20,
    alignSelf: "center",
    justifyContent: "center",
    fontSize: 24,
    fontFamily: "Verdana",
    fontWeight: "bold",
    borderRadius: 15,
    borderWidth: 2,
    padding: 15,
    backgroundColor: "turquoise",
  },
});
