import { View, Text } from "react-native";
import React from "react";
import { GestureHandlerRootView, TextInput } from "react-native-gesture-handler";

const Index = () => {
  return (
    <View>
      <GestureHandlerRootView>
     <TextInput placeholder="Search your Bills">
     </TextInput>
      </GestureHandlerRootView>
    </View>
  );
};

export default Index;
