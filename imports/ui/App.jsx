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
   this.state = {
     items: this.props.users,
     search: false,
   };

 }

  filterList(event){
    this.setState({search : true});
    event.preventDefault();
    this.trimList();

   }

   renderTags(){
     return this.props.tags.map((tag) => (
       <Tag key={tag._id} tag={tag} trim={this.trimList.bind(this)} />
     ));

   }

   trimList(){
     console.log(this.props.tags);
     const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
     let updatedList = this.props.users;
     updatedList = updatedList.filter(function(item){
        return item.expertArea.toLowerCase().search(
          text.toLowerCase()) !== -1;
      });

      let index1 = 0;
      let index2 = 0;
      let missMatch = false;
      while(index1 < updatedList.length && this.props.tags.length > 0){
        while(index2 < this.props.tags.length){
        if(updatedList[index1].expertArea.toLowerCase().search(this.props.tags[index2].tag)===-1){
          missMatch = true;
        }
        index2++;
       }
       if(missMatch){
        updatedList.splice(index1, 1);
        match = false;
      }else{
         index1++;
      }
       index2 = 0;

      }

      this.setState({items: updatedList});

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
   const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim().toLowerCase();

   //TODO: Varje mellanslag skall parsa ut flera taggar.
   if(text.length !== 0){
   Tags.insert({tag: text});
 }
 this.trimList();

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
