import React from "react";
import Header from "../components/Header";

export default class BuscarJobs extends React.Component {
  render() {
    return (
      <>
        <Header />
        <h2>Busca por Jobs</h2>
        <input></input>
        <input></input>
        <input></input>
        <select name="sort" required>
          <option value="" disabled selected>
            Selecione uma opção...
          </option>
          <option value="sem ordem">Sem ordenação</option>
          <option value="mínimo">Menor Valor</option>
          <option value="máximo">Maior Valor</option>
          <option value="título">Nome ou título</option>
          <option value="prazo">Prazo</option>
        </select>
        <hr></hr>
        <h2>Lista de Jobs</h2>
        <h4>Nome do Job</h4>
        <button>Ver detalhes</button>
        <button>Remover Job</button>
        <button>Adicionar ao carrinho</button>
        <hr></hr>
      </>
    );
  }
}
