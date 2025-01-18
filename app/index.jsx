import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import React, { useState } from "react";
import Card from "@/app-example/components/card";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";

export default function Index() {
  const [cards, setCards] = useState([]);

  const getdata = async () => {
    const data = await AsyncStorage.getItem("BillData");
    const formatted = data ? JSON.parse(data) : [];
    setCards(formatted);
  };

  useFocusEffect(
    React.useCallback(() => {
      getdata();
    }, [])
  );

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
              />
            ))
          ) : (
            <Text style={styles.noDataText}>
              No data available. Add a card!
            </Text>
          )}
        </ScrollView>
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.navigate("/form")}
      >
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
  },
  cardContainer: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    justifyContent: "center",
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
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 20,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
