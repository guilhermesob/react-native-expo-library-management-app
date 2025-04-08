import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Livro } from "../features/livros/model/livro.model";

type Props = {
  livro: Livro;
  onEditar: (livro: Livro) => void;
  onExcluir: (id: string) => void;
};

export default function LivroItem({ livro, onEditar, onExcluir }: Props) {
  return (
    <View style={styles.item}>
      <View>
        <Text>
          {livro.nome} - {livro.autor}
        </Text>
        <Text>Editora: {livro.editora}</Text>
        <Text>Disponibilidade: {livro.disponibilidade}</Text>
        <Text>Detalhes: {livro.detalhesExtras}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => onEditar(livro)}>
          <Text style={styles.actionText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onExcluir(livro.id)}>
          <Text style={styles.actionText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#ddd",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  actionText: {
    color: "blue",
    fontWeight: "bold",
  },
});
