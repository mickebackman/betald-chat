import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Users = new Mongo.Collection('users');

Meteor.methods({

  'tasks.search'(expertArea) {
    check(expertArea, String);

    Users.Collection.find({"expertArea":expertArea});

  },
});
