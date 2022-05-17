import react from "react";
import axios from "axios";
import moment from "moment";
import styled from "styled-components";

const Button = styled.button`
  margin: 1%;
  padding: 10px;
  border-radius: 75px 75px 75px 75px;
  &:hover {
    background-color: #F78002;
    cursor: pointer;
    text-transform: uppercase;
    font-weight:bold;
    color:#1B4458;
  }
`;

const Main = styled.div`
  margin: 10px ;
  background-color: antiquewhite;
  color: #F78002;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  height: 100vh;
  width: 100%;

  h1{
    color: #1B4458;
  }

  h2{
    text-transform: uppercase;
  }

  ul{
    text-transform: capitalize;
  }

  h3{
    text-decoration: underline;
  }
  
`;

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
        console.log(res.data);
        this.setState({ job: res.data });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  render() {
    return (
      <Main>
        <h1>Detalhes do Job</h1>
        <h2>{this.state.job.title}</h2>
        <p>Preço: R${this.state.job.price},00</p>
        <p>Prazo: {moment(this.state.job.dueDate).format("DD/MM/YYYY")}</p>
        <p>Descrição:{this.state.job.description}</p>
        <h3>Formas de Pagamento</h3>
        <ul>
          {this.state.job.paymentMethods &&
            this.state.job.paymentMethods.map((method) => {
              return <li>{method}</li>;
            })}
        </ul>
        <Button onClick={this.props.vaiParaBusca}>
          Voltar para Lista de Jobs
        </Button>
        <hr></hr>
      </Main>
    );
  }
}
