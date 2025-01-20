import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Alert,
  Modal,
} from "react-native";
import React, { useState } from "react";
import Card from "@/app-example/components/card";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";
import { TextInput } from "react-native-paper";

export default function Index() {
  const [cards, setCards] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editdata, seteditdata] = useState({});

  const getdata = async () => {
    const data = await AsyncStorage.getItem("BillData");
    const formatted = data ? JSON.parse(data) : [];
    setCards(formatted);
  };

  const handlePress = async (id, name, Left) => {
    Alert.alert(
      "Are you sure you want to permanently delete this bill?",
      `Bill for: ${name}\nAmount: ₹${Left} left!`,
      [
        {
          text: "Yes",
          onPress: async () => {
            const updatedCards = cards.filter((card) => card.id !== id);
            await AsyncStorage.setItem(
              "BillData",
              JSON.stringify(updatedCards)
            );
            setCards(updatedCards);
          },
        },
        {
          text: "Cancel",
          style: "cancel", // Optional: to style this as a cancel button
        },
      ]
    );
  };
  useFocusEffect(
    React.useCallback(() => {
      getdata();
    }, [])
  );
  const edit = (card) => {
    setModalVisible(true);
    seteditdata(card);
  };
  const handleeditpress = async () => {
    const updateddata = cards.map((card) => {
      card.id == editdata.id ? editdata : card;
    });
    await AsyncStorage.setItem("BillData", updateddata);
    setCards(updateddata);
    setModalVisible(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cardContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {cards.length > 0 ? (
            cards.map((card, index) => (
              <Card
                key={index}
                id={card.id}
                Name={card.name}
                Total={card.total}
                adv_date={card.date}
                Paid={card.paid}
                Item={card.item}
                Left={card.remain}
                Quantity={card.quantity}
                action={() => handlePress(card.id, card.name, card.remain)}
                edit_act={() => edit(card)}
              />
            ))
          ) : (
            <Text style={styles.noDataText}>Great!! No Bills Pending.</Text>
          )}
        </ScrollView>
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.navigate("/form")}
      >
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View>
          <TextInput
            label="Enter name"
            mode="outlined"
            value={editdata.name}
            onChangeText={(text) => seteditdata({ ...editdata, name: text })}
            style={styles.textInput}
          />
          <TextInput
            label="Enter Total Amount"
            mode="outlined"
            value={editdata.total}
            onChangeText={(text) => seteditdata({ ...editdata, total: text })}
            style={styles.textInput}
          />
          <TextInput
            label="Enter Amount Paid"
            mode="outlined"
            value={editdata.paid}
            onChangeText={(text) => seteditdata({ ...editdata, paid: text })}
            style={styles.textInput}
          />
          <TextInput
            label="Enter Name of the Item"
            mode="outlined"
            value={editdata.item}
            onChangeText={(text) => seteditdata({ ...editdata, item: text })}
            style={styles.textInput}
          />
          <TextInput
            label="Enter Quantity"
            mode="outlined"
            value={editdata.quantity}
            onChangeText={(text) =>
              seteditdata({ ...editdata, quantity: text })
            }
            style={styles.textInput}
          />
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                `Are you sure you want to change details for ${editdata.name}`,
                "",
                [
                  {
                    text: "Yes",
                    onPress: () => console.log(editdata),
                  },
                  {
                    text: "Cancel",
                  },
                ]
              );
            }}
          >
            <Text>Change</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>(setModalVisible(false))}>
            <Text>cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
  },
  textInput: {
    width: "100%",
    marginBottom: 15,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  cardContainer: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  noDataText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
  },
  addButton: {
    backgroundColor: "#007BFF",
    borderRadius: 25,
    width: 150,
    height: 70,
    paddingVertical: 15,
    paddingHorizontal: 30,
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: 20,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    alignSelf: "center",
  },
});
