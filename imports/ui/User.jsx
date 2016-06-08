import React, { Component, PropTypes } from 'react';

import { Tasks } from '../api/tasks.js';


// Task component - represents a single todo item
export default class User extends Component {


  render() {
    // Give tasks a different className when they are checked off,
    // so that we can style them nicely in CSS
//    const taskClassName = this.props.task.checked ? 'checked' : '';

    return (
      <li className={user}>

        <span className="text">
          <strong>{this.props.user.username}</strong>
        </span>
      </li>
    );
  }
}

User.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  user: PropTypes.object.isRequired,
};
