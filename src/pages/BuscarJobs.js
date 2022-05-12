import React from "react";
import axios from "axios";
import moment from "moment";

export default class BuscarJobs extends React.Component {
  state = {
    jobs: [],
    contratar: false,
    pesquisa: "",
    precoMinimo: "",
    precoMaximo: "",
  };

  componentDidMount() {
    this.getAllJobs();
  }

  novaPesquisa = (event) => {
    this.setState({ pesquisa: event.target.value });
  };

  alteraPrecoMin = (event) => {
    this.setState({ precoMinimo: event.target.value });
  };

  alteraPrecoMax = (event) => {
    this.setState({ precoMaximo: event.target.value });
  };

  deleteJob = (id) => {
    if (window.confirm(`Tem certeza que deseja excluir?`)) {
      const url = `https://labeninjas.herokuapp.com/jobs/${id}`;
      axios
        .delete(url, {
          headers: {
            Authorization: "d65e9d0c-c096-4aa7-b4c2-f5ac96adb4d6",
          },
        })
        .then((res) => {
          this.getAllJobs();
        })
        .catch((err) => {
          alert("ocorreu um erro tente novamente!");
        });
    }
  };



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
  render() {
    return (
      <>
        <h2>Busca por Jobs</h2>
        <input
          placeholder="Pesquisa"
          value={this.state.pesquisa}
          onChange={this.novaPesquisa}
        />
        <input
          type="number"
          placeholder="Preço Mínimo"
          value={this.state.precoMinimo}
          onChange={this.alteraPrecoMin}
        />
        <input
          type="number"
          placeholder="Preço Máximo"
          value={this.state.precoMaximo}
          onChange={this.alteraPrecoMax}
        />
        <hr></hr>
        <h2>Lista de Jobs</h2>
        <hr></hr>
        <div>
          {this.state.jobs
            .filter((job) => {
              return job.title
                .toLowerCase()
                .includes(this.state.pesquisa.toLowerCase());
            })
            .filter((job) => {
              return (
                this.state.precoMinimo === "" ||
                job.price >= this.state.precoMinimo
              );
            })
            .filter((job) => {
              return (
                this.state.precoMaximo === "" ||
                job.price <= this.state.precoMaximo
              );
            })
            .map((job) => {
              console.log(job.dueDate)
              return (
                <div>
                  <p>{job.title}</p>
                  <p>Preço: R${job.price.toFixed(2)}</p>
                  <p>Prazo: {moment.utc(job.dueDate).format("DD/MM/YYYY")}</p>
                  <button onClick={() => this.props.vaiParaDetalhes(job.id)}>
                    ver detalhe
                  </button>
                  <button onClick={() => this.deleteJob(job.id)}>
                    remover job
                  </button>
                  <button
                    onClick={() => {
                      this.props
                        .adicionarCarrinho(job)
                    }}
                  >
                    Adicionar ao Carrinho
                  </button>
                  <hr></hr>
                </div>
              );
            })}
          <hr></hr>
        </div>
      </>
    );
  }
}
