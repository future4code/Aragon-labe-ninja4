import React from "react";
import Cadastro from "./pages/Cadastro";
import BuscarJobs from "./pages/BuscarJobs";
import BemVindo from "./pages/Bemvindo";
import Carrinho from "./pages/Carrinho";
import DetalhesJobs from "./pages/DetalhesJobs";
import styled from "styled-components";
import "./App.css";

const Main = styled.div`
  margin: 0 ;
  background-color: #1B4458;
  color: #F78002;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  /* height: 100vh; */
`;

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
export default class App extends React.Component {
  state = {
    telaAtual: "inicio",
    jobClicado: "",
    carrinho: [],
  };

  adicionarCarrinho = (job) => {
    const indiceDoCarrinho = this.state.carrinho.findIndex(
      (produtoNoCarrinho) => {
        return job.id === produtoNoCarrinho.id;
      }
    );
    if (indiceDoCarrinho === -1) {
      const novoCarrinho = [...this.state.carrinho, job];
      if (window.confirm(`deseja incluir job no carrinho?`))
        this.setState({ carrinho: novoCarrinho });
    }
  };

  vaiParaCadastro = () => {
    this.setState({ telaAtual: "cadastro" });
  };

  vaiParaBusca = () => {
    this.setState({ telaAtual: "busca" });
  };

  vaiParaInicio = () => {
    this.setState({ telaAtual: "inicio" });
  };

  vaiParaCarrinho = () => {
    this.setState({ telaAtual: "carrinho" });
  };

  vaiParaDetalhes = (id) => {
    this.setState({ telaAtual: "detalhes", jobClicado: id });
  };

  limpaCarrinho = () => {
    this.setState({ carrinho: [] });
  };

  escolheTela = () => {
    switch (this.state.telaAtual) {
      case "cadastro":
        return <Cadastro vaiParaBusca={this.vaiParaBusca} />;
      case "busca":
        return (
          <BuscarJobs
            adicionarCarrinho={this.adicionarCarrinho}
            vaiParaDetalhes={this.vaiParaDetalhes}
          />
        );
      case "carrinho":
        return (
          <Carrinho
            carrinho={this.state.carrinho}
            vaiParaBusca={this.vaiParaBusca}
            vaiParaCarrinho={this.vaiParaCarrinho}
            limpaCarrinho={this.limpaCarrinho}
          />
        );
      case "detalhes":
        return (
          <DetalhesJobs
            vaiParaBusca={this.vaiParaBusca}
            id={this.state.jobClicado}
          />
        );
      case "inicio":
        return (
          <BemVindo
            vaiParaCadastro={this.vaiParaCadastro}
            vaiParaBusca={this.vaiParaBusca}
          />
        );
      default:
        return <div>Opção não encontrada!</div>;
    }
  };

  render() {
    return (
      <Main>
        <>
          <h1>LabeNinjas</h1>
          <Button onClick={this.vaiParaInicio}>Home</Button>
          <Button onClick={this.vaiParaCarrinho}>
            Ir para Carrinho <br /> de Compras
          </Button>
          <hr></hr>
        </>
        {this.escolheTela()}
      </Main>
    );
  }
}
