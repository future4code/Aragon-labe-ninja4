import React from "react";

export default class Header extends React.Component {
  render() {
    return (
      <>
        {this.props.Header}
        <h1>LabeNinjas</h1>
        <button>Ir para Home Page</button>
        <button>Ir para Carrinho de Compras</button>
        <hr></hr>
      </>
    );
  }
}
