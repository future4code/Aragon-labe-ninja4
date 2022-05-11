import react from "react";
import axios from "axios";
import moment from "moment";

export default class DetalhesJobs extends react.Component {
  state = {
    jobs: [],
    Jobs: [],
  };

  componentDidMount() {
    this.getJobById(this.props.id);
  }

  getJobById = (id) => {
    const url = `https://labeninjas.herokuapp.com/jobs/${id}`;
    axios
      .get(url, {
        headers: {
          Authorization: "d65e9d0c-c096-4aa7-b4c2-f5ac96adb4d6",
        },
      })
      .then((res) => {
        this.setState({ jobs: res.data });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  render() {
    return (
      <div>
        <h2>{this.state.jobs.title}</h2>
        <p>Preço: R${this.state.jobs.price},00</p>
        <p>Prazo: {moment(this.state.jobs.dueDate).format("DD/MM/YYYY")}</p>
        <p>descrição:{this.state.jobs.description}</p>
        <h3>formas de pagamento</h3>
        <p>{this.state.jobs.paymentMethods}</p>
        <button onClick={this.props.vaiParaBusca}>
          voltar para lista de jobs
        </button>
        <hr></hr>
      </div>
    );
  }
}
