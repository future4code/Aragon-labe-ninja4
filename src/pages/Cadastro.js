// import Header from "./components/Header";
import React from "react";
import axios from "axios";
import styled from "styled-components";

const Button = styled.button`
  padding: 10px;
  margin: 1%;
  border-radius: 75px 75px 75px 75px;
  &:hover {
    background-color: #F78002;
    cursor: pointer;
    text-transform: uppercase;
    font-weight:bold;
    color:inherit;
  }
`;

const Select = styled.select`
  margin: 1%;
`;

const Div = styled.div`
  background-color: antiquewhite;
  color: #1B4458;
  width: 100%;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
`;
const Input = styled.input`
  margin: 1%;

  &:hover {
    opacity: 80%;
  }
`;

const Form = styled.form`
  margin: 1%;

  &:hover {
    opacity: 80%;
  }
`;

export default class Cadastro extends React.Component {
  state = {
    inputTitulo: "",
    inputDescricao: "",
    inputPreco: 0,
    metodoPagamento: [],
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

  handleMetodoPagamento = (event) => {
    const value = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    this.setState({ metodoPagamento: value });
  };

  cadastrarServico = () => {
    const url = "https://labeninjas.herokuapp.com/jobs";

    const body = {
      title: this.state.inputTitulo,
      description: this.state.inputDescricao,
      price: this.state.inputPreco,
      paymentMethods: this.state.metodoPagamento,
      dueDate: this.state.inputData,
    };
    console.log(body);
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
      <Div>
        <h2>Cadastre um Novo Job</h2>

        <label>
          <p>Título:</p>

          <Input
            type="text"
            value={this.state.inputTitulo}
            onChange={this.onChangeInputTitulo}
          ></Input>

          <p>Descrição:</p>

          <Input
            type="text"
            value={this.state.inputDescricao}
            onChange={this.onChangeInputDescricao}
          ></Input>

          <p>Preço:</p>

          <Input
            type="number"
            value={this.state.inputPreco}
            onChange={this.onChangeInputPreco}
          ></Input>
        </label>

        <h4>
          <b>Formas de pagamento</b>
        </h4>

        <select
          name="metodosPagamentos"
          required
          onChange={this.handleMetodoPagamento}
          multiple
        >
          <option disabled>Selecione as formas de pagamento</option>

          <option value="boleto">Boleto</option>
          <option value="crédito">Cartão de Crédito</option>
          <option value="débito">Cartão de Débito</option>
          <option value="paypal">Paypal</option>
          <option value="pix">Pix</option>
        </select>

        <Form action="data">
          <label htmlFor="data">Prazo:</label>
          <input
            type="date"
            id=""
            name="data"
            value={this.state.inputData}
            onChange={this.onChangeInputData}
          />
              
        </Form>
        <Button type="submit" onClick={this.cadastrarServico}>
          Cadastrar Serviço
        </Button>
        <Button onClick={this.props.vaiParaBusca}>Voltar para Lista de Jobs</Button>
        
      </Div>

    );
  }
}
