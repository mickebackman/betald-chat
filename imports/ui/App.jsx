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
     searchInput: "",
   };

 }


  filterList(event){
    event.preventDefault();
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim().toLowerCase();
    this.setState({searchInput: text});

   }

   renderTags(){
     return this.props.tags.map((tag) => (
       <Tag key={tag._id} tag={tag} />
     ));

   }

 renderUsers() {
    console.log(this.props.users);
      if(this.props.users.length === 0){
        return (<li className="user">

          <span className="text">
            <strong>Loading...</strong>
          </span>
        </li>
       );
      }
      let updatedList = this.props.users;
      if(this.state.searchInput){
      const search = this.state.searchInput;
      updatedList = updatedList.filter(function(item){
         return item.expertArea.toLowerCase().search(
           search) !== -1;
       });
     }

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
         missMatch = false;
       }else{
          index1++;
       }
        index2 = 0;

       }

     if(updatedList.length===0){

         return (<li className="user">

           <span className="text">
             <strong>No results</strong>
           </span>
         </li>
        );
       }


   return updatedList.map((user) => (
     <User key={user._id} user={user} />
   ));
 }

 handleSubmit(event){
  // this.setState({search: true});
   event.preventDefault();
   // Find the text field via the React ref
   const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim().toLowerCase();

   if(text.length !== 0){
     let newTags = text.split(" ");
     for(i = 0; i < newTags.length; i++){
        Tags.insert({tag: newTags[i]});
     }


 }
 this.setState({searchInput:""});
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
