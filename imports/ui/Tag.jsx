import React, { Component, PropTypes } from 'react';
import { Tags } from '../api/users.js';


// Task component - represents a single todo item
export default class Tag extends Component {

  removeTag(){
    Tags.remove(this.props.tag._id);
  }
  
  render() {
    // Give tasks a different className when they are checked off,
    // so that we can style them nicely in CSS
//    const taskClassName = this.props.task.checked ? 'checked' : '';

    return (
      <li>
        {this.props.tag.tag}
        <button className="delete" onClick={this.removeTag.bind(this)}>
          &times;
        </button>

      </li>

    );
  }
}

Tag.PropTypes = {
tag: PropTypes.object.isRequired,
};