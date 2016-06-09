import React, { Component, PropTypes } from 'react';
import {removeTag} from './App';


// Task component - represents a single todo item
export default class Tag extends Component {


  render() {
    // Give tasks a different className when they are checked off,
    // so that we can style them nicely in CSS
//    const taskClassName = this.props.task.checked ? 'checked' : '';

    return (
      <li onclick={this.removeTag.bind(this)}>
        {this.props.tag}
      </li>

    );
  }
}

Tag.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  tag: PropTypes.object.isRequired,
};
