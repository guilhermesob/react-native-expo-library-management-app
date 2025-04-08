import { useState } from "react";
import { Livro } from "../model/livro.model";
import { Alert } from "react-native";

export function useLivrosController() {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [livrosFiltrados, setLivrosFiltrados] = useState<Livro[]>([]);
  const [livroEditando, setLivroEditando] = useState<Livro | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const adicionarLivro = (livro: Omit<Livro, "id">) => {
    const novoLivro: Livro = { ...livro, id: Date.now().toString() };
    const novaLista = [...livros, novoLivro];
    setLivros(novaLista);
    setLivrosFiltrados(novaLista);
  };

  const editarLivro = (livro: Livro) => {
    setLivroEditando(livro);
  };

  const salvarEdicaoLivro = (dados: Omit<Livro, "id">) => {
    if (!livroEditando) return;
    const atualizado: Livro = { ...dados, id: livroEditando.id };
    const novaLista = livros.map((livro) =>
      livro.id === atualizado.id ? atualizado : livro
    );
    setLivros(novaLista);
    setLivrosFiltrados(novaLista);
    setLivroEditando(null);
  };

  const excluirLivro = (id: string) => {
    const novaLista = livros.filter((livro) => livro.id !== id);
    setLivros(novaLista);
    setLivrosFiltrados(novaLista);
    Alert.alert("Sucesso", "Livro excluído!");
  };

  const filtrarLivros = (query: string) => {
    setSearchQuery(query);
    if (query) {
      const resultado = livros.filter((livro) =>
        Object.values(livro).some((valor) =>
          valor.toLowerCase().includes(query.toLowerCase())
        )
      );
      setLivrosFiltrados(resultado);
    } else {
      setLivrosFiltrados(livros);
    }
  };

  return {
    livrosFiltrados,
    livroEditando,
    searchQuery,
    adicionarLivro,
    editarLivro,
    salvarEdicaoLivro,
    excluirLivro,
    filtrarLivros,
    setLivroEditando,
  };
}
