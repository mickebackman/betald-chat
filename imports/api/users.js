import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Experts = new Mongo.Collection('experts');
export const Tags = new Mongo.Collection(null);