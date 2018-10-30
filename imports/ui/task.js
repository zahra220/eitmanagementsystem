import { Template } from 'meteor/templating';
 
import { Tasks } from '../api/tasks.js';
 
import './task.html';
 
Template.task.events({
  'click .update'() {
    var form = document.querySelector('.new-task');
    form.firstname.value= this.firstname;
    form.lastname.value= this.lastname;
    form.gender.value= this.gender;
    form.dob.value= this.dob;
    form.id.value= this._id;
    // Meteor.call('tasks.remove', this._id)
  },

});