import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { router } from "expo-router";

const Btn = ({ cont, action }) => {
  return (
    <GestureHandlerRootView style={{}}>
      <TouchableOpacity
        activeOpacity={0.5}
        style={{
          backgroundColor: "blue",
          borderRadius: 20,
          padding: 13,
          margin: 9,
          width: 400,
        }}
        onPress={action}
      >
        <Text style={{ textAlign: "center", color: "white" }}>{cont}</Text>
      </TouchableOpacity>
    </GestureHandlerRootView>
  );
};

export default Btn;
