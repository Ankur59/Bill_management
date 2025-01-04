import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { useState } from "react";
import Card from "@/app-example/components/card";
import Form from "./form";

export default function Index() {
  const [cards, setCards] = useState([]);

  const addCard = (newCardData) => {
    setCards((prev) => [...prev, newCardData]);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <Form onSubmit={addCard} />
        <ScrollView horizontal={true}>
          {cards.map((card) => (
            <Card
              id={card.Id}
              Name={card.Name}
              Total={card.Total}
              adv_date={card.adv_date}
              Paid={card.Paid}
              Item={card.Item}
              Quantity={card.Quantity}
            />
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 20,
    width: "100%",
    backgroundColor: "#F0F0F0",
  },
  scrollview: {
    backgroundColor: "#C8C8C8",
    width: "100%",
    height: 450,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 300,
  },
  parent: {
    alignItems: "center",
    justifyContent: "center",
  },
});
