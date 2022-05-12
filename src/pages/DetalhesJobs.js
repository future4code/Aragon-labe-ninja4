import react from "react";
import axios from "axios";
import moment from "moment";

export default class DetalhesJobs extends react.Component {
  state = {
    job: {},
    // Jobs: [],
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
        console.log(res.data)
        this.setState({ job: res.data });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  render() {
    return (
      <div>
        <h2>{this.state.job.title}</h2>
        <p>Preço: R${this.state.job.price},00</p>
        <p>Prazo: {moment(this.state.job.dueDate).format("DD/MM/YYYY")}</p>
        <p>descrição:{this.state.job.description}</p>
        <h3>formas de pagamento</h3>
        <ul>          
        {this.state.job.paymentMethods && this.state.job.paymentMethods.map((method)=>{
          return <li>{method}</li>
        })}
        </ul>
        <button onClick={this.props.vaiParaBusca}>
          voltar para lista de jobs
        </button>
        <hr></hr>
      </div>
    );
  }
}
