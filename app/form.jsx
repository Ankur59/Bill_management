import { View, StyleSheet, Text, TouchableOpacity, Modal } from "react-native";
import React, { useState, useEffect } from "react";
import { TextInput, Button } from "react-native-paper";
import Btn from "@/app-example/components/button";
import DatePicker from "react-native-modern-datepicker";
import { getToday, getFormatedDate } from "react-native-modern-datepicker";

const Form = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [total, setTotal] = useState("");
  const [paid, setPaid] = useState("");
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [remain, setRemain] = useState("");
  const [date, setDate] = useState();
  const [open, setOpen] = useState(false);

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
      setRemain("Gandu")
    }
  }
    check(diff)
  }, [total, paid]);

  const handleSubmit = () => {
    if (!name || !total || !paid || !item || !quantity || !date) {
      alert("Please fill all the fields");
      return;
    }

    const newCardData = {
      Id: Date.now().toString(),
      Name: name,
      Total: Number(total),
      Paid: Number(paid),
      adv_date: date,
      Left: Number(total) - Number(paid),
      Item: item,
      Quantity: quantity,
    };

    onSubmit(newCardData);

    // Reset the fields after submission
    setName("");
    setTotal("");
    setPaid("");
    setItem("");
    setQuantity("");
    setRemain("");
  };
  function handleOnPress() {
    setOpen(!open);
  }

  return (
    <View style={{ alignItems: "center", padding: 20 }}>
      <TextInput
        label="Enter name"
        mode="outlined"
        value={name}
        onChangeText={(text) => setName(text)}
        style={styles.textInput}
      />
      <TextInput
        label="Enter Total Amount"
        mode="outlined"
        keyboardType="numeric"
        value={total}
        onChangeText={(text) => setTotal(text)}
        style={styles.textInput}
      />
      <TextInput
        label="Enter Amount Paid"
        mode="outlined"
        keyboardType="numeric"
        value={paid}
        onChangeText={(text) => setPaid(text)}
        style={styles.textInput}
      />
      <TextInput
        label="Enter Name of the Item"
        mode="outlined"
        value={item}
        onChangeText={(text) => setItem(text)}
        style={styles.textInput}
      />
      <TextInput
        label="Enter Quantity"
        mode="outlined"
        value={quantity}
        onChangeText={(text) => setQuantity(text)}
        style={styles.textInput}
      />
      <TextInput
        label="Remaining Payment"
        mode="outlined"
        editable={false}
        value={remain}
        style={styles.textInput}
      />
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
      <View style={{ marginTop: 20 }}>
        <Btn cont={"Submit"} action={handleSubmit} />
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
    alignItems: "center",
    margintop: 22,
  },
  modal: {
    flexDirection: "column",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    width: "90%",
    padding: 35,
    alignitem: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowradius: 4,
    elevation: 5,
  },
});

export default Form;
