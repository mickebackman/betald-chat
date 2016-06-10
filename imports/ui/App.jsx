import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

import { Experts } from '../api/users.js';
import { Tags } from '../api/users.js';

import User from './User.jsx';
import Tag from './Tag.jsx'

// App component - represents the whole app
class App extends Component {

  constructor(props) {
   super(props);
   console.log("users: "+ this.props.users);
   this.state = {
     items: this.props.users,
     search: false,
   };

 }

  filterList(event){
    this.setState({search : true});
    event.preventDefault();
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
     console.log(text);
     let updatedList = this.props.users;
     updatedList = updatedList.filter(function(item){
       return item.expertArea.toLowerCase().search(
         text.toLowerCase()) !== -1;
     });

     this.setState({items: updatedList});
   }

   renderTags(){
     return this.props.tags.map((tag) => (
       <Tag key={tag._id} tag={tag} />
     ));

   }


 renderUsers() {
  //  console.log("users:" + this.props.items);
  let filteredUsers;
  if(!this.state.search){
    filteredUsers = this.props.users;
  }else{
    filteredUsers = this.state.items;
 }

   if(filteredUsers.length === 0 && this.state.search){
     return (<li className="user">

       <span className="text">
         <strong>No results</strong>
       </span>
     </li>
    );
   }

   return filteredUsers.map((user) => (
     <User key={user._id} user={user} />
   ));
 }

 handleSubmit(event){
   this.setState({search: true});
   event.preventDefault();
   // Find the text field via the React ref
   const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
   
   //TODO: Varje mellanslag skall parsa ut flera taggar.
   Tags.insert({tag: text});

   ReactDOM.findDOMNode(this.refs.textInput).value = '';
   

 }


 render() {
  //TODO: Set maxlength so that it is working.
   return(
   <div className="container">
     <header>
       <h1>Vad behöver du hjälp med?</h1>
     </header>

       <AccountsUIWrapper />
         <form className="search" onChange={this.filterList.bind(this)} onSubmit={this.handleSubmit.bind(this)} >
           <input
             type="text"
             ref="textInput"
             placeholder="Sök"
             maxlength="20"
             size="20"
           />
         </form>

         <ul className="tagList">
           {this.renderTags()}
         </ul>

      <ul>
        {this.renderUsers()}
      </ul>


  </div>
);
}
 }

 App.propTypes = {
   currentUser: PropTypes.object,
   users: PropTypes.array,
   tags: PropTypes.array,
 };

 export default createContainer(() => {
   return {
     currentUser: Meteor.user(),
     users: Experts.find({}).fetch(),
     tags: Tags.find({}).fetch(),
   };
 }, App);
