import React from 'react'
import TodoList from './TodoList'
import Form from './Form'
import axios from 'axios'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      input: '',
      hideCompleted: false,
      errMsg: ''
    };
  }

  // Handler Functions
  nameInputChange = evt => {
    const { value } = evt.target;
    this.setState({ ...this.state, input: value})
  }
  resetInput = () => this.setState({ ...this.state, input: "" });
  setError = (err) => this.setState({ ...this.state, err});
  toggleHideCompleted = () => {
    this.setState({ ...this.state, hideCompleted: !this.state.hideCompleted})
  }
  onFormSubmit = evt => {
    evt.preventDefault();
    this.postNewTodo()
  }

  //API functions
  fetchTodos = () => {
    axios.get(URL)
      .then(res => {
        this.setState({ ...this.state, todos: res.data.data })
      })
      .catch(this.setError)
  }
  postNewTodo = () => {
    axios.post(URL, {name: this.state.input})
      .then (res => {
        this.setState({ ...this.state, todos: this.state.todos.concat(res.data.data)})
        this.resetInput()
      })
      .catch(this.setError)
  }
  patchTodoCompleted = (id) => {
    axios.patch(URL+"/"+id)
      .then(res => {
        this.setState({...this.state, todos: this.state.todos.map(todo => {
          if (todo.id != id) return todo
          return res.data.data
        })})
      })
      .catch(this.setError);
  }
  componentDidMount() {
    this.fetchTodos()
  }

  render() {
    return (
      <div>
        <h2>Todos: </h2>
        <TodoList
          todos={this.state.todos}
          hideCompleted={this.state.hideCompleted}
          patchTodoCompleted={this.patchTodoCompleted}
        />
        <Form 
          input={this.state.input}
          hideComplete={this.state.hideCompleted}
          onFormSubmit={this.onFormSubmit}
          toggleHideCompleted={this.toggleHideCompleted}
          nameInputChange={this.nameInputChange}
        />
      </div>
    )
  }
}
