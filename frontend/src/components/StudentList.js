import React, { Component } from "react";
import { Table } from "reactstrap";

import axios from "axios";

import { API_URL } from "../constants";

class StudentList extends Component {
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
    //const students = this.props.students;
    const students = this.state.students;
    return (
      <Table dark>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Date of Birth</th>
            <th>Phone</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {!students || students.length <= 0 ? (
            <tr>
              <td colSpan="6" align="center">
                <b>Ops, no one here yet</b>
              </td>
            </tr>
          ) : (
            students.map((student) => (
              <tr key={student.pk}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.dob}</td>
                <td>{student.phone}</td>
                <td>{student.registrationDate}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    );
  }
}

export default StudentList;
