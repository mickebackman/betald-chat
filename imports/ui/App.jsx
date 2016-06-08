import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';


// App component - represents the whole app
class App extends Component {

  constructor(props) {
   super(props);

 }

 renderUsers() {
   let filteredUsers = this.props.users;
//   if (this.state.hideCompleted) {
//     filteredTasks = filteredTasks.filter(task => !task.checked);
//   }
   return filteredUsers.map((user) => (
     <Task key={user._id} user={user} />
   ));
 }

 render() {
   return(
   <div className="container">
     <header>
       <h1>Vad behöver du hjälp med?</h1>
     </header>



    <AccountsUIWrapper />
      <ul>
        {this.renderUsers()}
      </ul>


  </div>
);
}
 }

 App.propTypes = {
   currentUser: PropTypes.object,
 };

 export default createContainer(() => {
   return {
     currentUser: Meteor.user(),
     users: Meteor.users.find({}, { sort: { createdAt: -1 } }).fetch(),
   };
 }, App);
