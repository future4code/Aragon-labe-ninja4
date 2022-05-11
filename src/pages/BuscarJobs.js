import React from "react";
import axios from "axios";
import moment from "moment";

export default class BuscarJobs extends React.Component {
  state = {
    jobs: [],
  };

  componentDidMount() {
    this.getAllJobs();
  }

  componentDidUpdate() {
    this.getAllJobs();
  }

  deleteJob = (id) => {
    if (window.confirm(`Tem certeza que deseja excluir?`)){
    const url = `https://labeninjas.herokuapp.com/jobs/${id}`;
    axios
      .delete(url, {
        headers: {
          Authorization: "d65e9d0c-c096-4aa7-b4c2-f5ac96adb4d6",
        },
      })
      .then((res) => {
        alert("job deletado com sucesso!");
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
    const jobList = this.state.jobs.map((job) => {
      return (
        <div>
          <p>{job.title}</p>
          <p>Preço: R${job.price.toFixed(2)}</p>
          <p>Prazo: {moment(job.dueDate).format("DD/MM/YYYY")}</p>
          <button onClick={() => this.props.vaiParaDetalhes(job.id)}>
            ver detalhe
          </button>
          <button onClick={() => this.deleteJob(job.id)}>remover job</button>
          <button>adicionar ao carrinho</button>
        </div>
      );
    });
    return (
      <>
        <h2>Busca por Jobs</h2>
        <input></input>
        <input></input>
        <input></input>
        <select name="sort" required>
          <option value="" disabled selected>
            Selecione uma opção...
          </option>
          <option value="sem ordem">Sem ordenação</option>
          <option value="mínimo">Menor Valor</option>
          <option value="máximo">Maior Valor</option>
          <option value="título">Nome ou título</option>
          <option value="prazo">Prazo</option>
        </select>
        <hr></hr>
        <h2>Lista de Jobs</h2>
        <div>
          <h1>job</h1>
          {jobList}
          <hr></hr>
        </div>
      </>
    );
  }
}
