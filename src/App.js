import Header from "./components/Header";
import React from "react";
import Cadastro from "./pages/Cadastro";
import BuscarJobs from "./pages/BuscarJobs";

export default class App extends React.Component {
  state = {
    telaAtual: "cadastro",
  };

  vaiParaCadastro = () => {
    this.setState({ telaAtual: "cadastro" });
  };

  vaiParaBusca = () => {
    this.setState({ telaAtual: "busca" });
  };

  escolheTela = () => {
    switch (this.setState.telaAtual) {
      case "cadastro":
        return <Cadastro />;
      case "busca":
        return <BuscarJobs />;
      default:
        return "cadastro";
    }
  };

  render() {
    return (
      <div>
        <Header />
        <h2>Bem-vindo à LabeNinjas!</h2>
        {/* <Cadastro />
        <BuscarJobs /> */}
        <button onClick={() => this.vaiParaCadastro}>Cadastrar um Job</button>
        <button onClick={() => this.vaiParaBusca}>Contratar Jobs</button>
      </div>
    );
  }
}
