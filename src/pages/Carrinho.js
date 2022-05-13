import React from "react";
import axios from "axios";

export default class Carrinho extends React.Component {
  state = {
    jobs: [],
  };

  componentDidMount() {
    this.getAllJobs();
  }

  getAllJobs = () => {
    const url = "https://labeninjas.herokuapp.com/jobs";
    axios
      .get(url, {
        headers: {
          Authorization: "d65e9d0c-c096-4aa7-b4c2-f5ac96adb4d6",
        },
      })
      .then((res) => {
        this.setState({ jobs: res.data.jobs });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  contratarServico = (id) => {
    const url = `https://labeninjas.herokuapp.com/jobs/${id}`;
    const body = {
      taken: true,
    };

    axios
      .post(url, body, {
        headers: {
          Authorization: "d65e9d0c-c096-4aa7-b4c2-f5ac96adb4d6",
        },
      })
      .then((res) => {})
      .catch((error) => {});
  };

  finalizarCompra = () => {
    for (let job of this.props.carrinho) {
      this.contratarServico(job.id);
    }
    this.props.limpaCarrinho();
    alert("compra finalizada com sucesso!");
  };

  removerJob = (id) => {
    if (window.confirm(`Tem certeza que remover este Job do carrinho?`)) {
      const indice = this.props.carrinho.indexOf(id);
      this.props.carrinho.splice(indice, 1);
      this.props.vaiParaCarrinho();
    }
  };

  retirarServico = (id) => {
    const url = `https://labeninjas.herokuapp.com/jobs/${id}`;
    const body = {
      taken: false,
    };

    axios
      .post(url, body, {
        headers: {
          Authorization: "d65e9d0c-c096-4aa7-b4c2-f5ac96adb4d6",
        },
      })
      .then((res) => {
        alert(res.data.message);
        this.getAllJobs();
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  render() {
    const jobList = this.props.carrinho.map((job) => {
      return (
        <div>
          <p>
            {job.title} - R${job.price.toFixed(2)}
          </p>
          <button
            onClick={() => {
              this.removerJob(job.id);
            }}
          >
            remover
          </button>
          <hr></hr>
        </div>
      );
    });
    const total = this.props.carrinho.reduce(
      (total, job) => total + job.price,
      0
    );
    return (
      <>
        <h1>Dados da compra</h1>
        <p>Preço total: R$ {total.toFixed(2)}</p>
        <button onClick={this.props.vaiParaBusca}>
          Voltar para a lista de Jobs
        </button>
        <button
          onClick={() => {
            this.finalizarCompra();
          }}
        >
          Finalizar compra
        </button>
        <hr></hr>
        <h2>Carrinho</h2>
        <hr></hr>
        <div>{jobList}</div>
      </>
    );
  }
}
