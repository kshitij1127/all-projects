import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';
import db from '../config'
import * as firebase from 'firebase'

export default class Book extends React.Component {
  constructor() {
    super();
    this.state = {
      hasCameraPermission: null,
      scanned: false,
      scannedBookID: '',
      scannedStudentID: '',
      buttonState: 'normal',
      transactionMessage: ''
    };
  }

  getCameraPermission = async (id) => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermissions: status === 'granted',
      buttonState: id,
      scanned: false,
    });
  };

  handleBarCodeScanned = async ({ type, data }) => {
    const { buttonState } = this.state;
    if (buttonState === 'bookId') {
      this.setState({
        scanned: true,
        buttonState: 'normal',
        scannedBookID: data,
      });
    } else if (buttonState === 'studentId') {
      this.setState({
        scanned: true,
        buttonState: 'normal',
        scannedStudentID: data,
      });
    }
  };

  initiateBookIssue = async() => {
    db.collection("transactions").add({
      'studentID': this.state.scannedStudentID,
      'bookId': this.state.scannedBookID,
      'date': firebase.firestore.Timestamp.now().toDate(),
      'transactionType': 'issued',
    })
    db.collection("books").doc(this.state.scannedBookID).update({
      'bookAvailability':  false
    })
    db.collection("students").doc(this.state.scannedStudentID).update({
      'numberOfBooksIssued': firebase.firestore.FieldValue.increment(1)
    })
    this.setState({
      scannedBookID: '',
      scannedStudentID: '',
    })
  }

  initiateBookReturn = () => {
    db.collection("transactions").add({
      'studentID': this.state.scannedStudentID,
      'bookId': this.state.scannedBookID,
      'date': firebase.firestore.Timestamp.now().toDate(),
      'transactionType': 'returned',
    })
    db.collection("books").doc(this.state.scannedBookID).update({
      'bookAvailability':  true
    })
    db.collection("students").doc(this.state.scannedStudentID).update({
      'numberOfBooksIssued': firebase.firestore.FieldValue.increment(-1)
    })
    this.setState({
      scannedBookID: '',
      scannedStudentID: '',
    })
  }

  handleTransaction = async() => {
       var transactionMessage
       db.collection("books").doc(this.state.scannedBookID).get()
       .then((doc) => {
         var book = doc.data()
         if(book.bookAvailability){
           this.initiateBookIssue()
           transactionMessage = "book issued"
         }else{
           this.initiateBookReturn()
           transactionMessage = "book return"
         }
       })
       this.setState({
         transactionMessage: transactionMessage
       })
  }

  render() {
    const hasCameraPermissions = this.state.hasCameraPermissions;
    const scanned = this.state.scanned;
    const buttonState = this.state.buttonState;

    if (buttonState !== 'normal' && hasCameraPermissions) {
      return (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned()}
          style={StyleSheet.absoluteFillObject}
        />
      );
    } else if (buttonState === 'normal') {
      return (
        <View style={styles.container}>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputBox}
              placeholder="Book ID"
              value={this.state.scannedBookID}
              onChangeText={(text) => {
                this.setState({
                  scannedBookID: text,
                });
              }}
            />
            <TouchableOpacity
              style={styles.scanButton}
              onPress={() => {
                this.getCameraPermission('bookId');
              }}>
              <Text style={styles.buttonText}>scan</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputView}>
            <TextInput
              style={styles.inputBox}
              placeholder="Student ID"
              value={this.state.scannedStudentID}
              onChangeText={(text) => {
                this.setState({
                  scannedStudentID: text,
                });
              }}
            />
            <TouchableOpacity
              style={styles.scanButton}
              onPress={() => {
                this.getCameraPermission('studentID');
              }}>
              <Text style={styles.buttonText}>scan</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.displayText}>
            {hasCameraPermissions === true
              ? this.state.scannedData
              : 'Request Camera Permission'}
          </Text>
          <Image
            style={styles.image}
            source={{
              uri:
                'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Barcode-scanner.jpg/220px-Barcode-scanner.jpg',
            }}
          />
          <TouchableOpacity
            style={styles.scanButton}
            onPress={async() => {this.handleTransaction()}}
            >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  scanButton: {
    backgroundColor: '#2196F3',
    marginLeft: 10,
    width: 80,
    height: 40,
    textAlign: 'center',
  },
  buttonText: { fontSize: 15, textAlign: 'center', marginTop: 10 },
  inputView: { flexDirection: 'row', margin: 20 },
  inputBox: { width: 200, height: 40, borderWidth: 3, fontSize: 20 },
});
