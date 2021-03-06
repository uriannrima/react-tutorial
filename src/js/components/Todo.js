import React from "react";

export default class extends React.Component {
  constructor(props) {
    super();
    this.onDelete = this.onDelete.bind(this);
  }

  onDelete(e) {
    this.props.onDeleteTodo(e, this.props.id);
  }

  toggleComplete(e){
    this.props.onToggleComplete(e, this.props.id);
  }

  render() {
    const { complete, edit, text } = this.props;

    const icon = complete ? "\u2714" : "\u2716"

    if (edit) {
      return (
        <li>
          <input value={text} focus="focused" />
        </li>
      );
    }

    return (
      <li>
        <input type="checkbox" value={complete} checked={complete} onChange={this.toggleComplete.bind(this)}></input>
        <span>{text} </span>
        <span onClick={this.onDelete}> {icon}</span>
      </li>
    );
  }
}