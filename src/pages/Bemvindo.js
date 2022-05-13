import React from "react";
import styled from "styled-components";

const Button = styled.button`
  margin: 1%;
  padding: 10px;
  border-radius: 75px 75px 75px 75px;
  &:hover {
    background-color: #F78002;
    cursor: pointer;
    text-transform: uppercase;
    font-weight:bold;
    color:#1B4458;
  }
`;

const Texto = styled.div`
background-color: antiquewhite;
  color: #F78002;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  width: 100%;
  min-height: 80vh;
  /* margin-top: 100px; */

  h1{
    text-decoration: underline;
    margin: 20px;
  }

h2{
    margin: 30px;
    color: #1B4458;
    &:hover{
      text-transform: uppercase;
      color: #F78002;
    }    
  }

 
  
`
export default class BemVindo extends React.Component {
  render() {
    return (
      <Texto>
        <h1>Bem vindo ao LabeNinjas</h1>
        <h2>Seja um LabeNinja!</h2>
        <Button onClick={this.props.vaiParaCadastro}>Cadastre-se</Button>
        <h2>Encontre o serviço que procura!</h2>
        <Button onClick={this.props.vaiParaBusca}>Contratar um job</Button>
        <hr></hr>
      </Texto>
    );
  }
}
