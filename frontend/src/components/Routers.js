import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Route from "react-router-dom/Route";
import Home from "./Home";
import StudentList from "./StudentList";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/" exact strict render={() => <Home />} />
          <Route path="/allforms" exact strict render={() => <StudentList />} />
        </div>
      </Router>
    );
  }
}

export default App;
