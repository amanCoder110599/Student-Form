import React, { Component, Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import NewStudentForm from "./NewStudentForm";

class NewStudentModal extends Component {
  state = {
    modal: false,
  };

  toggle = () => {
    this.setState((previous) => ({
      modal: !previous.modal,
    }));
  };

  render() {
    const create = this.props.create;
    const TodoComponent = {
      width: "300px",
      margin: "30px auto",
      background: "linear-gradient(to left, Turquoise, DarkCyan)",
      minHeight: "200px",
      boxSizing: "border-box",
      borderRadius: "50px",
      paddingTop: "5%",
    };
    const Header = {
      padding: "10px 20px",
      textAlign: "center",
      color: "DarkSalmon",
      fontSize: "50px",
    };
    var title = "Editing Student";
    var button = <Button onClick={this.toggle}>Edit</Button>;
    if (create) {
      title = "Creating New Student";

      button = (
        <Button
          color="primary"
          class="align-middle"
          onClick={this.toggle}
          style={{ minWidth: "200px", marginTop: "300px", marginLeft: "50px" }}
        >
          Create New
        </Button>
      );
    }

    return (
      <Fragment>
        <div style={TodoComponent}>
          <h1 style={Header}>User Form</h1>
          {button}
        </div>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>{title}</ModalHeader>

          <ModalBody>
            <NewStudentForm
              resetState={this.props.resetState}
              toggle={this.toggle}
              student={this.props.student}
            />
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

export default NewStudentModal;
