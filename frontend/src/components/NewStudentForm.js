import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import axios from "axios";
import moment from "moment";

import { API_URL } from "../constants";
import { Redirect } from "react-router-dom";
class NewStudentForm extends React.Component {
  state = {
    name: "",
    email: "",
    dob: moment().format("YYYY-MM-DD"),
    dobb: new Date(),
    phone: "",
    date: moment().format("YYYY-MM-DD"),
    redirect: null,
  };

  componentDidMount() {
    if (this.props.student) {
      const { name, dob, email, phone } = this.props.student;
      this.setState({ name, dob, email, phone });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  checkDateValidity() {
    var years = moment(this.state.date).diff(moment(this.state.dob), "years");
    //console.log(years + " " + this.state.date + " " + this.state.dob);

    if (years >= 18) return true;
  }
  checkEmailValidity() {
    return /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(this.state.email);
  }
  createStudent = (e) => {
    //console.log(this.state.dob);
    //console.log(moment().format("YYYY-MM-DD"));
    e.preventDefault();

    var ema = this.checkEmailValidity();
    var dateval = this.checkDateValidity();
    var all = "";
    if (!ema) all += "Please write a valid email\n";
    if (!dateval)
      all += "Please give a valid DOB(DOB should be greater than 18 years)";
    if (!ema || !dateval) {
      alert(all);
      return;
    }

    axios
      .post(API_URL, this.state)
      .then(() => {
        this.props.resetState();
        this.props.toggle();
        // browserHistory.push("/allforms");

        this.setState({ redirect: "/allforms" });
      })
      .catch((err) => {
        var obj = err.response.data;
        var makeAlert = "";
        //err.response.data.map((data) => alert(err.response.data[data]));
        for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
            var val = obj[key][0];
            //console.log(val);
            makeAlert += val + "\n";
          }
        }
        ////console.log(err.response.data);
        alert(makeAlert);
      });
  };

  editStudent = (e) => {
    e.preventDefault();
    axios.put(API_URL, this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  defaultIfEmpty = (value) => {
    return value === "" ? "" : value;
  };
  handleChange = (date) => {
    this.setState({
      dobb: date,
    });
    this.setState({ dob: moment(date).format("YYYY-MM-DD") });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <Form
        onSubmit={this.props.student ? this.editStudent : this.createStudent}
      >
        <FormGroup>
          <Label for="name">Name:</Label>
          <Input
            type="text"
            name="name"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.name)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email:</Label>
          <Input
            type="email"
            name="email"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.email)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="dob">Date of Birth:</Label>
          <DatePicker
            selected={this.state.dobb}
            onChange={this.handleChange}
            dateFormat="yyyy-MM-dd"
            showYearDropdown
            showMonthDropdown
            scrollableMonthYearDropdown
          />
        </FormGroup>
        <FormGroup>
          <Label for="phone">Phone:</Label>
          <Input
            type="text"
            name="phone"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.phone)}
          />
        </FormGroup>

        <Button>Send</Button>
      </Form>
    );
  }
}

export default NewStudentForm;
