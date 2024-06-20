import React from 'react'

export default class Todo extends React.Component {
  render() {
    return (
      <li onClick={() => this.props.patchTodoCompleted(this.props.todo.id)}>
        {this.props.todo.name}
        <span >{this.props.todo.completed ? '✔' : ''}</span>
      </li>
    )
  }
}