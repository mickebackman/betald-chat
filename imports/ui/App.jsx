import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

import { Experts } from '../api/users.js';

import User from './User.jsx';

// App component - represents the whole app
class App extends Component {

  constructor(props) {
   super(props);
   this.state = {
     items: [],
   };

 }
  filterList(event){
    event.preventDefault();
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
     console.log(text);
     var updatedList = this.props.users;
     updatedList = updatedList.filter(function(item){
       return item.expertArea.toLowerCase().search(
         text.toLowerCase()) !== -1;
     });
     console.log("Ifilter "+updatedList);
     this.setState({items: updatedList});
   }


 renderUsers() {
  //  console.log("users:" + this.props.items);
   let filteredUsers = this.state.items;

   return filteredUsers.map((user) => (
     <User key={user._id} user={user} />
   ));
 }


 render() {
   return(
   <div className="container">
     <header>
       <h1>Vad behöver du hjälp med?</h1>
     </header>

       <AccountsUIWrapper />
         <form className="search" onSubmit={this.filterList.bind(this)} >
           <input
             type="text"
             ref="textInput"
             placeholder="Sök"
           />
         </form>

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
     users: Experts.find().fetch(),
   };
 }, App);
