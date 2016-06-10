import React, { Component, PropTypes } from 'react';



// Task component - represents a single todo item
export default class Tag extends Component {

  render() {
    // Give tasks a different className when they are checked off,
    // so that we can style them nicely in CSS
//    const taskClassName = this.props.task.checked ? 'checked' : '';

    return (
      <li>
        {this.props.tag}
        <button classname="delete" onClick={this.props.removeTag}>
          &times;
        </button>

      </li>

    );
  }
}

Tag.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  tag: PropTypes.string.isRequired,
  removeTag: React.PropTypes.func,
};
