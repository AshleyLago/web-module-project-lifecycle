import React from 'react'

export default class Form extends React.Component {
  render() {
    return (
      <form onSubmit={this.props.onFormSubmit}>
        <input 
          type="text"
          value={this.props.input}
          onChange={this.props.nameInputChange}
          placeholder='Type todo'
        />
        <button type="Submit">Submit</button>
        <br /><br />
        <button type="button" onClick={this.props.toggleHideCompleted}>
          {this.props.hideCompleted ? 'Show Completed' : 'Hide Completed'}
        </button>
      </form>
    )
  }
}