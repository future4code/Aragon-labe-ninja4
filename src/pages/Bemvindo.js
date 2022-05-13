import React from "react";
import styled from "styled-components";

const Button = styled.button`
  margin: 1%;
  &:hover {
    background-color: violet;
    cursor: pointer;
  }
`;
export default class BemVindo extends React.Component {
  render() {
    return (
      <>
        <h1>Bem vindo ao labeNinjas</h1>
        <h2>seja um LabeNinja!</h2>
        <Button onClick={this.props.vaiParaCadastro}>Cadastre-se</Button>
        <h2>Encontre o serviço que procura!</h2>
        <Button onClick={this.props.vaiParaBusca}>Contratar um job</Button>
        <hr></hr>
      </>
    );
  }
}
