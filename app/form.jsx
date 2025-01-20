import { View, StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { TextInput } from "react-native-paper";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker"; // Updated import

const Form = () => {
  const [name, setName] = useState(""); // Store name input
  const [total, setTotal] = useState(""); // Store total amount input
  const [paid, setPaid] = useState(""); // Store amount paid input
  const [item, setItem] = useState(""); // Store item name input
  const [quantity, setQuantity] = useState(""); // Store quantity input
  const [remain, setRemain] = useState(); // Store calculated remaining amount
  const [date, setDate] = useState(""); // Store selected date as string
  const [open, setOpen] = useState(false); // Toggle date picker visibility

  // Save function to store data in AsyncStorage
  const save = async () => {
    try {
      // Ensure all fields are filled
      if (name && total && paid && item && quantity && date) {
        // Calculate the remaining amount (Total - Paid)
        const calculatedRemain = Math.max(
          0,
          parseFloat(total) - parseFloat(paid)
        );
        const unique = Date.now();
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
            remain: calculatedRemain.toString(), // Store the calculated
            id: unique,
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

  // Get today's date
  const today = new Date();
  const startDate = today.toISOString().split("T")[0]; // Formatting date to yyyy-mm-dd

  useEffect(() => {
    const diff = total - paid;
    const check = (diff) => {
      if (diff >= 0) {
        const fin = diff.toString();
        setRemain(fin);
      } else {
        setRemain("0");
      }
    };
    check(diff);
  }, [total, paid]);

  // Format date to display in DD/MM/YYYY
  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Handle date picker visibility toggle
  function handleDatePicker() {
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
          value={date ? formatDate(date) : ""} // Formats date to DD/MM/YYYY
          style={{ width: "100%", marginBottom: 15, borderColor: "blue" }}
        />

        <TouchableOpacity
          onPress={handleDatePicker}
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

      {/* DateTimePicker directly below without modal */}
      {open && (
        <DateTimePicker
          value={date ? new Date(date) : new Date()} // Use the selected date or current date
          mode="date" // Mode is date picker
          display="default"
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || date;
            setDate(currentDate);
            setOpen(false); // Close the date picker after selection
          }}
        />
      )}

      {/* Submit button */}
      <View>
        <TouchableOpacity
          onPress={save}
          style={{
            marginTop: 20,
            paddingHorizontal: 5,
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
          <Text style={{ color: "white" }}>Submit</Text>
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
