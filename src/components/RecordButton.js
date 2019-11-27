import React from "react";
import { Text, View, TouchableHighlight, Image, StyleSheet } from "react-native";

const RecordButton = ({
  hasAudioPermissions,
  isRecording,
  beginRecording,
  stopRecording
}) => {
  return (
    <View>
      {hasAudioPermissions ? (
        <View style={styles.buttonBackground}>
          <TouchableHighlight
            style={styles.buttonBackground}
            underlayColor="rgb(255, 255, 255)"
            onPress={isRecording ? stopRecording : beginRecording}
          >
            <View style={styles.imageContainer}>
              <Image
                style={styles.controlImage}
                source={
                  isRecording
                    ? require("../assets/images/stop.png")
                    : require("../assets/images/mic.png")
                }
              />
            </View>
          </TouchableHighlight>
          <View style={styles.controlTextContainer}>
            <Text style={styles.controlText}>
              {isRecording ? "Tap to Stop Recording" : "Tap to Record"}
            </Text>
          </View>
        </View>
      ) : (
        <Text>No audio permissions set</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    borderRadius: 100,
    alignSelf: "center",
    padding: 10,
    backgroundColor: "rgb(239, 87, 87)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5
  },
  controlImage: {
    width: 150,
    height: 150,
    tintColor: "white"
  },
  controlText: {
    fontSize: 30
  },
  controlTextContainer: {
    marginTop: 30,
    alignItems: "center"
  }
});

export default RecordButton;
