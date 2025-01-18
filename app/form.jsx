import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { TextInput } from "react-native-paper";
import DatePicker from "react-native-modern-datepicker";
import { getFormatedDate } from "react-native-modern-datepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const Form = () => {
  const [name, setName] = useState(""); // Store name input
  const [total, setTotal] = useState(""); // Store total amount input
  const [paid, setPaid] = useState(""); // Store amount paid input
  const [item, setItem] = useState(""); // Store item name input
  const [quantity, setQuantity] = useState(""); // Store quantity input
  const [remain, setRemain] = useState(""); // Store calculated remaining amount
  const [date, setDate] = useState(); // Store selected date
  const [open, setOpen] = useState(false); // Toggle date picker modal visibility
  const [id, setId] = useState(""); // Store ID (not currently used in the code)

  // Save function to store data in AsyncStorage
  const save = async () => {
    try {
      // Ensure all fields are filled
      if (name && total && paid && item && quantity && date) {
        // Validate that total and paid are numeric values

        // Calculate the remaining amount (Total - Paid)
        const calculatedRemain = Math.max(
          0,
          parseFloat(total) - parseFloat(paid)
        );
        const unique=Date.now();
        // Fetch existing data from AsyncStorage and parse it
        const previous = await AsyncStorage.getItem("BillData");
        const formatted = previous ? JSON.parse(previous) : [];

        // Create the new data entry to be stored
        const data = [
          ...formatted,
          {
            name,
            total,
            paid,
            item,
            quantity,
            remain: calculatedRemain.toString(), // Store the calculated remain
            id:unique,
            date,
          },
        ];

        // Store the updated data in AsyncStorage
        await AsyncStorage.setItem("BillData", JSON.stringify(data));

        router.navigate("/");
      } else {
        // Show error if any field is empty
        Alert.alert("Error", "Please fill out all fields!");
      }
    } catch (e) {
      console.error(e);
      Alert.alert("Error", "An error occurred while saving the data.");
    }
  };

  // Get today's date and format it
  const today = new Date();
  const startDate = getFormatedDate(
    today.setDate(today.getDate() + 1),
    "DD/MM/YYYY"
  );

  useEffect(() => {
    const diff=(total-paid)
    const check=(diff)=>{if(diff>=0){
    const fin=diff.toString()
    setRemain(fin)}
    else{
      setRemain("0")
    }
  }
    check(diff)
  }, [total, paid]);

  // Handle date picker modal visibility toggle
  function handleOnPress() {
    setOpen(!open);
  }

  return (
    <View style={{ alignItems: "center", padding: 20 }}>
      {/* Name input */}
      <TextInput
        label="Enter name"
        mode="outlined"
        value={name}
        onChangeText={(text) => setName(text)}
        style={styles.textInput}
      />

      {/* Total amount input */}
      <TextInput
        label="Enter Total Amount"
        mode="outlined"
        keyboardType="numeric"
        value={total}
        onChangeText={(text) => setTotal(text)}
        style={styles.textInput}
      />

      {/* Amount paid input */}
      <TextInput
        label="Enter Amount Paid"
        mode="outlined"
        keyboardType="numeric"
        value={paid}
        onChangeText={(text) => setPaid(text)}
        style={styles.textInput}
      />

      {/* Item name input */}
      <TextInput
        label="Enter Name of the Item"
        mode="outlined"
        value={item}
        onChangeText={(text) => setItem(text)}
        style={styles.textInput}
      />

      {/* Quantity input */}
      <TextInput
        label="Enter Quantity"
        mode="outlined"
        value={quantity}
        onChangeText={(text) => setQuantity(text)}
        style={styles.textInput}
      />

      {/* Display remaining amount, calculated automatically */}
      <TextInput
        label="Remaining Payment"
        mode="outlined"
        editable={false}
        value={remain}
        style={styles.textInput}
      />

      {/* Date and date picker button */}
      <View
        style={{
          width: "50%",
          padding: 0,
          alignSelf: "flex-start",
          flexDirection: "row",
        }}
      >
        <TextInput
          label="Final payment Date"
          mode="outlined"
          editable={false}
          value={date}
          style={{ width: "100%", marginBottom: 15, borderColor: "blue" }}
        />

        <TouchableOpacity
          onPress={handleOnPress}
          style={{
            backgroundColor: "blue",
            borderRadius: 30,
            height: 52,
            width: 120,
            marginLeft: 20,
            padding: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "white" }}>Select Date</Text>
        </TouchableOpacity>
      </View>

      {/* Date picker modal */}
      <Modal animationType="slide" transparent={true} visible={open}>
        <View style={styles.centered}>
          <View style={styles.modal}>
            <DatePicker
              mode="calendar"
              selected={date}
              minimumDate={startDate}
              onSelectedChange={(date) => setDate(date)}
            />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <TouchableOpacity
                onPress={handleOnPress}
                style={{
                  backgroundColor: "blue",
                  borderRadius: 30,
                  height: 40,
                  width: 120,
                  padding: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "white" }}>Done</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleOnPress}
                style={{
                  backgroundColor: "red",
                  borderRadius: 30,
                  height: 40,
                  width: 120,
                  padding: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "white" }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Submit button */}
      <View style={{ marginTop: 20 }}>
        <TouchableOpacity onPress={save}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    width: "100%",
    marginBottom: 15,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    flexDirection: "column",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    width: "90%",
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default Form;
