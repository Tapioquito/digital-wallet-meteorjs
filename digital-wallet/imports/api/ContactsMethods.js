import { check } from "meteor/check";
import { Meteor } from "meteor/meteor";

import { ContactsCollection } from "./ContactsCollection";

Meteor.methods({
  'contacts.insert'({ name, email, imageUrl }) {
    check(name, String);
    check(email, String);
    check(imageUrl, String);
    
    if(!name) {
      throw new Meteor.Error("Name is required.");
    }
    if(!email) {
      throw new Meteor.Error("Email is required.");
    }
    return ContactsCollection.insert({ name, email, imageUrl, createdAt: new Date()});
  },
  'contacts.remove'({contactId}){
    check(contactId, String)
    if(this.isSimulation)
    return ContactsCollection.remove(contactId)
  },
  'contacts.archive'({contactId}){
    check(contactId,String)
    ContactsCollection.update({_id:contactId},{$set:{archived:true}})}
});
