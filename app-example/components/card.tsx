import { View, Text, StyleSheet } from "react-native";
import React from "react";

const Card = ({
  Name,
  Left,
  Total,
  Paid,
  Item,
  Quantity,
  id,
  adv_date,
  final_date,
}) => {
  const colors = {
    green: "#00FF00",
    red: "#FF0000",
    yellow: "#FFFF00",
  };

  const getColor = (Paid) => {
    if (Paid < Total * 0.5) {
      return colors.red;
    } else if (Paid >= Total * 0.5) {
      return colors.green;
    } else {
      return colors.yellow;
    }
  };

  const dotColor = getColor(Paid);

  return (
    <View style={styles.card}>
      <View style={[styles.dot, { backgroundColor: dotColor }]} />
      <Text style={styles.billId}>Bill ID: {id}</Text>
      <Text style={styles.name}>{Name}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Total:</Text>
        <Text style={styles.infoValue}>{Total}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Paid:</Text>
        <Text style={styles.infoValue}>{Paid}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Left:</Text>
        <Text style={styles.infoValue}>{Left}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Item:</Text>
        <Text style={styles.infoValue}>{Item}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Quantity:</Text>
        <Text style={styles.infoValue}>{Quantity}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Final payment Date:</Text>
        <Text style={styles.infoValue}>{adv_date}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderColor: "blue",
    borderWidth: 2,
    backgroundColor: "white",
    height: 320,
    width: 300,
    margin: 20,
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5, // For Android shadow
    position: "relative", // Allows positioning of the dot
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    position: "absolute",
    top: 10,
    right: 10,
  },
  billId: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#555",
    marginBottom: 5,
  },
  name: {
    fontSize: 25,
    fontWeight: "bold",
    fontStyle: "italic",
    marginBottom: 15,
    color: "#333",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 16,
    color: "#444",
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
  },
});

export default Card;
