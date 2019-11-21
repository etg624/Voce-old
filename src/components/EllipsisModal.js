import React from 'react';
import { Modal, View, Text, TouchableHighlight, Alert } from 'react-native';

const EllipsisModal = ({
  modalVisible,
  setModalVisible,
  item,
  handleDeleteRecording
}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, .5)',
          justifyContent: 'flex-end',
          alignContent: 'center'
        }}
      >
        <TouchableHighlight
          onPress={() =>
            Alert.alert(
              'Delete?',
              'Delete this recording?',
              [
                {
                  text: 'Cancel',
                  onPress: () => setModalVisible(false),
                  style: 'cancel'
                },
                {
                  //TODO make it only possible for user that created recording to delete
                  // put most of this logic in context and update state accordingly
                  // and refactor
                  text: 'Delete',
                  onPress: async () => {
                    setModalVisible(false);
                    handleDeleteRecording(item.id);
                  }
                }
              ],
              { cancelable: false }
            )
          }
          style={{
            alignItems: 'center',
            backgroundColor: 'white',
            marginBottom: 20,
            marginHorizontal: 20,
            borderRadius: 6,
            paddingVertical: 10
          }}
        >
          <Text
            style={{
              color: 'black',

              fontSize: 20,
              alignSelf: 'center'
            }}
          >
            Delete?
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => setModalVisible(false)}
          style={{
            alignItems: 'center',
            backgroundColor: 'white',
            marginBottom: 20,
            marginHorizontal: 20,
            borderRadius: 6,
            paddingVertical: 10
          }}
        >
          <Text
            style={{
              color: 'black',

              fontSize: 20,
              alignSelf: 'center'
            }}
          >
            Cancel
          </Text>
        </TouchableHighlight>
      </View>
    </Modal>
  );
};

export default EllipsisModal;
