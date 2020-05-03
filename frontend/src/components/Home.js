import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import NewStudentModal from "./NewStudentModal";

import axios from "axios";

import { API_URL } from "../constants";

class Home extends Component {
  state = {
    students: [],
  };

  componentDidMount() {
    this.resetState();
  }

  getStudents = () => {
    axios.get(API_URL).then((res) => this.setState({ students: res.data }));
  };

  resetState = () => {
    this.getStudents();
  };

  render() {
    return (
      <Container
        style={{
          marginTop: "20px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <NewStudentModal create={true} resetState={this.resetState} />
      </Container>
    );
  }
}

export default Home;
