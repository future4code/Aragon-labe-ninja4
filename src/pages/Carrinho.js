import React from "react";
import Header from "../components/Header";

export default class Carrinho extends React.Component {
  render() {
    return (
      <>
        <Header />
        <h1>Dados da compra</h1>
        <p>Preço total:</p>
        <button>Voltar para a lista de Jobs</button>
        <button>Finalizar compra</button>
        <hr></hr>
        <h2>Carrinho</h2>
      </>
    );
  }
}
