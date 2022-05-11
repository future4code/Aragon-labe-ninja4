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
        return <Cadastro />;
      case "busca":
        return <BuscarJobs vaiParaDetalhes={this.vaiParaDetalhes} />;
      case "carrinho":
        return <Carrinho vaiParaBusca={this.vaiParaBusca} />;
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
          <h1>labeNinjas</h1>
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
