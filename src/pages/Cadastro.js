// import Header from "./components/Header";
import React from "react";
import axios from "axios";

export default class Cadastro extends React.Component {
  state = {
    inputTitulo: "",
    inputDescricao: "",
    inputPreco: 0,
    inputFormaDePagamento: [""],
    inputData: "",
  };

  onChangeInputTitulo = (event) => {
    this.setState({ inputTitulo: event.target.value });
  };

  onChangeInputDescricao = (event) => {
    this.setState({ inputDescricao: event.target.value });
  };

  onChangeInputPreco = (event) => {
    this.setState({ inputPreco: parseInt(event.target.value) });
  };

  onChangeInputFormaDePagamento = (event) => {
    this.setState({ inputFormaDePagamento: [event.target.value] });
  };

  onChangeInputData = (event) => {
    this.setState({ inputData: event.target.value });
  };

  cadastrarServico = () => {
    const url = "https://labeninjas.herokuapp.com/jobs";

    const body = {
      title: this.state.inputTitulo,
      description: this.state.inputDescricao,
      price: this.state.inputPreco,
      paymentMethods: this.state.inputFormaDePagamento,
      dueDate: this.state.inputData,
    };

    axios
      .post(url, body, {
        headers: {
          Authorization: "d65e9d0c-c096-4aa7-b4c2-f5ac96adb4d6",
        },
      })
      .then((response) => {
        if (window.confirm(`Tem certeza que deseja incluir esse job?`))
          alert(response.data.message);
        this.setState({ inputTitulo: "" });
        this.setState({ inputDescricao: "" });
        this.setState({ inputPreco: "" });
        this.setState({ inputFormaDePagamento: [""] });
        this.setState({ inputData: "" });
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  render() {
    return (
      <>
        <h2>Cadastre um Novo Job</h2>

        <label>
          <p>Título:</p>

          <input
            type="text"
            value={this.state.inputTitulo}
            onChange={this.onChangeInputTitulo}
          ></input>

          <p>Descrição:</p>

          <input
            type="text"
            value={this.state.inputDescricao}
            onChange={this.onChangeInputDescricao}
          ></input>

          <p>Preço:</p>

          <input
            type="number"
            value={this.state.inputPreco}
            onChange={this.onChangeInputPreco}
          ></input>
        </label>

        <h4>
          <b>Formas de pagamento</b>
        </h4>

        <select
          name="opcoes"
          required
          value={this.state.inputFormaDePagamento}
          onChange={this.onChangeInputFormaDePagamento}
        >
          <option disabled>Selecione suas opções...</option>

          <option value="boleto">Boleto</option>
          <option value="credito">Cartão de Crédito</option>
          <option value="débito">Cartão de Débito</option>
          <option value="paypal">Paypal</option>
          <option value="pix">Pix</option>
        </select>

        <form action="data">
          <label for="">Data:</label>
          <input
            type="date"
            id=""
            name="date"
            value={this.state.inputData}
            onChange={this.onChangeInputData}
          />
        </form>
        <button onClick={this.props.vaiParaBusca}>
          Voltar para a lista de Jobs
        </button>
        <button onClick={this.cadastrarServico}>Cadastrar Serviço</button>
      </>
    );
  }
}
