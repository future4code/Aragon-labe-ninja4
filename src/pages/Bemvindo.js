import React from "react";

export default class BemVindo extends React.Component {
  render() {
    return (
      <>
        <h1>Bem vindo ao labeNinjas</h1>
        <button onClick={this.props.vaiParaCadastro}>Cadastrar um job</button>
        <button onClick={this.props.vaiParaBusca}>Contratar um job</button>
        <hr></hr>
      </>
    );
  }
}
