import React from 'react'
import Todo from './Todo'

export default class TodoList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.todos.filter(todo => !this.props.hideCompleted || !todo.completed).map((todo, index) => (
          <Todo 
            key={index}
            todo={todo}
            index={index}
            patchTodoCompleted={this.props.patchTodoCompleted}
          />
        ))}
      </ul>
    )
  }
}
