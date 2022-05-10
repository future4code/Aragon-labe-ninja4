// import Header from "./components/Header";
import React from "react";
import Header from "../components/Header";

export default class Cadastro extends React.Component {
  render() {
    return (
      <>
        <Header />
        <h2>Cadastre um Novo Job</h2>
        <label>
          <p>Tíulo:</p>
          <input></input>
          <p>Descrição:</p>
          <input></input>
          <p>Preço:</p>
          <input></input>
        </label>
        <h4>
          <b>Formas de pagamento</b>
        </h4>
        <select name="opcoes" required>
          <option value="" disabled selected>
            Selecione suas opções...
          </option>
          <option value="boleto">Boleto</option>
          <option value="credito">Cartão de Crédito</option>
          <option value="débito">Cartão de Débito</option>
          <option value="paypal">Paypal</option>
          <option value="pix">Pix</option>
        </select>
        <form action="data">
          <label for="">Data:</label>
          <input type="date" id="" name="date" />
        </form>
        <button>Cadastrar Serviço</button>
      </>
    );
  }
}
