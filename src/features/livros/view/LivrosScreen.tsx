import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  View,
  StyleSheet,
} from "react-native";
import { useLivrosController } from "../controller/useLivrosController";
import { Livro } from "../model/livro.model";
import LivroItem from "../../../components/LivroItem";

export default function LivrosScreen() {
  const {
    livrosFiltrados,
    livroEditando,
    searchQuery,
    adicionarLivro,
    editarLivro,
    salvarEdicaoLivro,
    excluirLivro,
    filtrarLivros,
  } = useLivrosController();

  const [form, setForm] = useState<Omit<Livro, "id">>({
    nome: "",
    autor: "",
    editora: "",
    disponibilidade: "",
    detalhesExtras: "",
  });

  const handleSubmit = () => {
    if (livroEditando) {
      salvarEdicaoLivro(form);
    } else {
      adicionarLivro(form);
    }
    setForm({
      nome: "",
      autor: "",
      editora: "",
      disponibilidade: "",
      detalhesExtras: "",
    });
  };

  return (
    <>
      <Text style={styles.title}>Gerenciamento de Biblioteca</Text>

      <TextInput
        style={styles.input}
        placeholder="Pesquisar livros..."
        value={searchQuery}
        onChangeText={filtrarLivros}
      />

      {["nome", "autor", "editora", "disponibilidade", "detalhesExtras"].map(
        (field) => (
          <TextInput
            key={field}
            style={styles.input}
            placeholder={field[0].toUpperCase() + field.slice(1)}
            value={form[field as keyof typeof form]}
            onChangeText={(value) =>
              setForm((prev) => ({ ...prev, [field]: value }))
            }
          />
        )
      )}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>
          {livroEditando ? "Salvar Alterações" : "Adicionar Livro"}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={livrosFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <LivroItem
            livro={item}
            onEditar={editarLivro}
            onExcluir={excluirLivro}
          />
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: { color: "white", fontWeight: "bold" },
});
