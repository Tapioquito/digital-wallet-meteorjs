import { useFind, useSubscribe } from 'meteor/react-meteor-data';
import React, { memo } from "react";

import { ContactsCollection } from "../api/ContactsCollection";

export const ContactList = () => {
  const isLoading =  useSubscribe('allConttacts');


  const contacts = useFind(()=>{
    return ContactsCollection.find({}, { sort: { createdAt: -1 }}).fetch();
  })
  if (isLoading) {
    return  (
    <div>
      <div className="mt-10">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Loading...
        </h3>
          </div>
    </div>
    )
    
  }
  const removeContact = (ev, _id) => {
    ev.preventDefault();
    Meteor.call('contacts.remove', {contactId: _id});
  }
const ContactItem = memo(({contact})=>{
  return(
            <li className="py-4 flex items-center justify-between space-x-3">
              <div className="min-w-0 flex-1 flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <img className="h-10 w-10 rounded-full" src={contact.imageUrl} alt="" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 truncate">{contact.name}</p>
                  <p className="text-sm font-medium text-gray-500 truncate">{contact.email}</p>
                </div>
                <div>
                  <a 
                  href="#"
                  className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm font-medium rounded"
                  onClick={(ev)=>removeContact(ev, contact._id)}
                  >
                    Remove
                    </a>
                </div>
              </div>
            </li>

  )
})
  return (
    <div>
      <div className="mt-10">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          Contact List
        </h3>
        <ul role="list" className="mt-4 border-t border-b border-gray-200 divide-y divide-gray-200">
          {contacts.map((contact) => (
            <ContactItem key={contact._id} contact={contact}/>
          ))}
        </ul>
      </div>
    </div>
  )
}