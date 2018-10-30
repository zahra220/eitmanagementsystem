import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Tasks } from '../api/tasks.js';
 
import './task.js';
import './body.html';

var checkedArray = [];
 
Template.body.helpers({
  tasks() {
    return Tasks.find({});
  },
});

Template.body.events({
  'submit .new-task'(event) {
    
    // Prevent default browser form submit
     event.preventDefault();
 
    // Get value from form element
    const target = event.target;
    const firstname = target.firstname.value;
    const lastname = target.lastname.value;
    const gender = target.gender.value;
    const dob = target.dob.value;
    const id = target.id.value;

    if (id){
      Meteor.call('tasks.update', firstname, lastname, gender, dob, id);
    } else{
      Meteor.call('tasks.insert', firstname, lastname, gender, dob);
    }
    

 
    // Clear form
    target.firstname.value = '';
    target.lastname.value = '';
    target.gender.value = '';
    target.dob.value = '';
    target.id.value = '';
  },

  'click .delete-multiple'(event){
    var id = event.target.value;
    if(event.target.checked){
      checkedArray.push(id);
    }else{
      checkedArray.splice(checkedArray.indexOf(id), 1);
    }

  },

  'click #delete'(event){
    for (var i =0; i<checkedArray.length; i++ ){
      id = checkedArray[i];
      Meteor.call('multiple.remove', id);
    }
  }
});