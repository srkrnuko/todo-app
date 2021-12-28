import "./App.scss";
import React from "react";

class Add extends React.Component {
  render() {
    return (
      <div className="add">
        <h2>add</h2>
        <div className="addtask">
          <div className="form-header">
            <div className="taskname">taskname</div>
            <div className="limit">limit</div>
          </div>
          <form onSubmit={this.props.onSubmit}>
            <div className="taskname">
              <input
                name="name"
                type="text"
                value={this.props.name}
                onChange={this.props.onChange}
              />
            </div>
            <div className="limit">
              <input
                name="limit"
                type="text"
                value={this.props.limit}
                onChange={this.props.onChange}
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

function Task(props) {
  let className = "task" + props.index;
  if (props.task.isCompleted) {
    className += " completed";
  }

  return (
    <li className={className}>
      <div>
        <input
          type="checkbox"
          name={props.index}
          checked={props.task.isCompleted}
          onChange={props.onChange}
        />
      </div>
      <div className="taskname">{props.task.name}</div>
      <div className="timelimit">{props.task.limit}</div>
      <div className="delete">
        <input
          type="button"
          name={props.index}
          value="delete"
          onClick={props.onClick}
        />
      </div>
    </li>
  );
}

class Todo extends React.Component {
  render() {
    const tasklist = this.props.tasks;
    let tasks = tasklist.map((task, i) => {
      return (
        <Task
          key={i}
          task={task}
          index={i}
          onChange={this.props.onChange}
          onClick={this.props.onClick}
        />
      );
    });

    return (
      <div className="task">
        <h2>Tasks</h2>
        <ul className="tasklist">
          <li>
            <div className="completed">completed</div>
            <div className="taskname">name</div>
            <div className="timelimit">limit</div>
            <div className="delete"></div>
          </li>
          {tasks}
        </ul>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    const initTask = localStorage.getItem("tasks")
      ? JSON.parse(localStorage.getItem("tasks"))
      : [];
    this.state = {
      tasks: initTask,
      name: "",
      limit: "",
    };
    this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOnClickDelete = this.handleOnClickDelete.bind(this);
  }

  handleChangeCheckbox(event) {
    const target = event.target;
    const value = target.checked;
    const name = target.name;
    let tasks = this.state.tasks;
    tasks[name].isCompleted = value;
    this.setState(
      {
        tasks: tasks,
      },
      () => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
      }
    );
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const name = this.state.name;
    const limit = this.state.limit;
    const task = {
      isCompleted: false,
      name: name,
      limit: limit,
    };
    let tasks = this.state.tasks;

    tasks.push(task);
    this.setState(
      {
        tasks: tasks,
        name: "",
        limit: "",
      },
      () => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
      }
    );
  }

  handleOnClickDelete(event) {
    const targetIndex = event.target.name;
    event.preventDefault();
    let tasks = this.state.tasks;
    tasks.splice(targetIndex, 1);
    this.setState(
      {
        tasks: tasks,
      },
      () => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
      }
    );
  }

  render() {
    return (
      <div className="App">
        <Todo
          tasks={this.state.tasks}
          onChange={this.handleChangeCheckbox}
          onClick={this.handleOnClickDelete}
        />
        <Add
          name={this.state.name}
          limit={this.state.limit}
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default App;
