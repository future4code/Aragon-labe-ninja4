import React from "react";
import Cadastro from "./pages/Cadastro";
import BuscarJobs from "./pages/BuscarJobs";
import BemVindo from "./pages/Bemvindo";
import Carrinho from "./pages/Carrinho";
import DetalhesJobs from "./pages/DetalhesJobs";

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
        return <div>opção não encontrada!</div>;
    }
  };

  render() {
    return (
      <div>
        <>
          <h1>LabeNinjas</h1>
          <button onClick={this.vaiParaInicio}>Home</button>
          <button onClick={this.vaiParaCarrinho}>
            Ir para Carrinho de Compras
          </button>
          <hr></hr>
        </>
        {this.escolheTela()}
      </div>
    );
  }
}
