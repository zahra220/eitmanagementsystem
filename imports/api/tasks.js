import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Tasks = new Mongo.Collection('tasks');
 
Meteor.methods({
  'tasks.insert' (firstname, lastname, gender, dob) {
    // check(text, String);
 
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
 
    Tasks.insert({
      firstname,
      lastname,
      gender,
      dob,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });
  },
  'tasks.remove'(taskId) {
    check(taskId, String);
 
    Tasks.remove(taskId);
  },
  'tasks.setChecked'(taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);
 
    Tasks.update(taskId, { $set: { checked: setChecked } });
  },

  'tasks.update'(firstname, lastname, gender, dob, id){
    Tasks.update(id, { $set: { firstname: firstname, lastname:lastname, gender:gender, dob:dob } });

  },

  'multiple.remove' (id){
      Tasks.remove(id);
  },
});