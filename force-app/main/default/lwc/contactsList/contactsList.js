import { LightningElement, wire } from 'lwc';
import getContacts from '@salesforce/apex/AccountServices.getContacts';

import ACCMC from '@salesforce/messageChannel/AccountServices__c';
import { subscribe, APPLICATION_SCOPE, MessageContext } from 'lightning/messageService';

export default class ContactsList extends LightningElement {

    accountId;

    contacts; 

    emptyContacts;
    
    @wire(MessageContext)
    messageContext;

    subscribeMC() {
        
        if (this.subscription || this.accountId) {
            return;
        }
       
        this.subscription = subscribe(
            this.messageContext,
            ACCMC,
            (message) => { this.accountId = message.accountId },
            { scope: APPLICATION_SCOPE }
        );

    }

    connectedCallback() {
        this.subscribeMC();
    }

    @wire(getContacts, {accID : "$accountId"})
    wiredContacts({data, error}){
    
        if (data) {
            this.contacts = data;
            console.log("Wire = " + this.contacts);

            if (this.contacts.lenght === 0) {
                this.emptyContacts = true;
            } else {
                this.emptyContacts = false;
            }
            
        } else if(error) {
            console.log("Error");
        }
    }


    



}