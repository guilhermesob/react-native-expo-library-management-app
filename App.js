import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import LivrosScreen from "./src/features/livros/view/LivrosScreen";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <LivrosScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    padding: 20,
  },
});
