import React from "react";

export default class Carrinho extends React.Component {
  render() {
    return (
      <>
        <h1>Dados da compra</h1>
        <p>Preço total:</p>
        <button onClick={this.props.vaiParaBusca}>
          Voltar para a lista de Jobs
        </button>
        <button>Finalizar compra</button>
        <hr></hr>
        <h2>Carrinho</h2>
      </>
    );
  }
}
