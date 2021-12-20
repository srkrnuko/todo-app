import "./App.scss";
import React from "react";

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      limit: "",
    };

    this.handleChangeName = this.handleChange.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmitAdd(event) {
    event.preventDefault();
    //const name = this.state.name;
    //const limit = this.state.limit;
  }
  render() {
    return (
      <div className="add">
        <h2>add</h2>
        <div className="addtask">
          <form onSubmit={this.handleSubmitAdd}>
            <div className="taskname">
              <input
                name="name"
                type="text"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </div>
            <div className="limit">
              <input
                name="limit"
                type="text"
                value={this.state.limit}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <input type="submit" value="Add" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [
        {
          completed: false,
          name: "sampletask1",
          limit: "21:00",
        },
      ],
    };
    this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
  }
  handleChangeCheckbox(event) {
    //const target = event.target;
    //const value = target.checked;
    //const name = target.name;
  }
  render() {
    return (
      <div className="task">
        <h2>Tasks</h2>
        <ul className="tasklist">
          <li>
            <div className="completed">completed</div>
            <div className="taskname">name</div>
            <div className="timelimit">limit</div>
          </li>
          <li>
            <div>
              <input type="checkbox" onChange={this.handleChangeCheckbox} />
            </div>
            <div className="taskname">{this.state.tasks[0].name}</div>
            <div className="timelimit">{this.state.tasks[0].limit}</div>
          </li>
        </ul>
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Todo />
        <Add />
      </div>
    );
  }
}

export default App;
