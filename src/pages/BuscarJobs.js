import React from "react";
import axios from "axios";
import moment from "moment";
import styled from "styled-components";

const Div = styled.div`
  background-color:antiquewhite;
  width: 100%;
  /* min-height: 10vh;  */
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
`;
const Main = styled.div`
  background-color: #F78002;
  color: #1B4458;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
`;

const Job = styled.div`
  background-color: #1B4458;
  color: #F78002;
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  column-count: 3;
  border: 1px dashed #F78002;
  text-transform: capitalize;
  &:hover{
    font-weight: bold;
  }

  h2{
    text-decoration: underline;
  }
`;

const Button = styled.button`
  margin: 1%;
  width: 10%;
  border-radius: 75px 75px 75px 75px;
  &:hover {
    background-color: #F78002;
    cursor: pointer;
    text-transform: uppercase;
    font-weight:bold;
    color:#1B4458;
  }
`;

const Input = styled.input`
  margin: 1%;
  width: 20%;
  border-radius: 75px 75px 75px 75px;
  padding: 5px;
  &:hover {
    opacity: 80%;
  }
`;

export default class BuscarJobs extends React.Component {
  state = {
    jobs: [],
    contratar: false,
    pesquisa: "",
    precoMinimo: "",
    precoMaximo: "",
    ordem: "title",
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

  atualizaOrdem = (event) => {
    this.setState({ ordem: event.target.value });
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
      <Main>
        <h2>Busca por Jobs</h2>
        <Input
          placeholder="🔍 Digite o job que está procurando"
          value={this.state.pesquisa}
          onChange={this.novaPesquisa}
        />
        <Input
          type="number"
          placeholder="Preço Mínimo"
          value={this.state.precoMinimo}
          onChange={this.alteraPrecoMin}
        />
        <Input
          type="number"
          placeholder="Preço Máximo"
          value={this.state.precoMaximo}
          onChange={this.alteraPrecoMax}
        />
        <label for="sort">Filtre por Ordenação</label>
        <select
          name="sort"
          value={this.state.ordem}
          onChange={this.atualizaOrdem}
        >
          <option value="unsorted">Sem ordenação</option>
          <option value="minPrice">Valor mínimo</option>
          <option value="maxPrice">Valor máximo</option>
          <option value="title">Título</option>
          <option value="dueDate">Prazo</option>
        </select>

        <hr></hr>
        <Div>
        <h2>Lista de Jobs</h2>
        <hr></hr>
        
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
            .sort((jobAtual, proximoJob) => {
              switch (this.state.ordem) {
                case "title":
                  return jobAtual.title.localeCompare(proximoJob.title);
                case "dueDate":
                  return (
                    new Date(jobAtual.dueDate).getTime() -
                    new Date(proximoJob.dueDate).getTime()
                  );
                case "minPrice":
                  return jobAtual.price - proximoJob.price;
                case "maxPrice":
                  return proximoJob.price - jobAtual.price;
                default:
                  return "title";
              }
            })
            .map((job) => {
              console.log(job.dueDate);
              return (
                <Job>
                  <p>{job.title}</p>
                  <p>Preço: R${job.price.toFixed(2)}</p>
                  <p>Prazo: {moment.utc(job.dueDate).format("DD/MM/YYYY")}</p>
                  <Button onClick={() => this.props.vaiParaDetalhes(job.id)}>
                    Ver Detalhes
                  </Button>
                  <Button onClick={() => this.deleteJob(job.id)}>
                    Remover Job
                  </Button>
                  <Button
                    onClick={() => {
                      this.props.adicionarCarrinho(job);
                    }}
                  >
                    Adicionar ao Carrinho
                  </Button>
                  <hr></hr>
                </Job>
              );
            })}
          <hr></hr>
        </Div>
      </Main>
    );
  }
}
