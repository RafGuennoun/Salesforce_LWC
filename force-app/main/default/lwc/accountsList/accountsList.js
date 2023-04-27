import { LightningElement,api, wire, track } from 'lwc';

import getAccounts from '@salesforce/apex/AccountServices.getAccounts';

import ACCMC from '@salesforce/messageChannel/AccountServices__c';
import { publish, MessageContext } from 'lightning/messageService';


export default class AccountsList extends LightningElement {

    @track
    accounts;
    
    @api
    selectedAccountId;

    @wire(getAccounts)
    wiredAccounts({data, error }){
        if (data) {
            this.accounts = data;
        } else if (error){
            console.log("Error ");
        }
    }

    @wire(MessageContext)
    messageContext;

    updateSelectedTile(event) {
        this.selectedAccountId = event.detail.accountId;
        this.sendMessageService(this.selectedAccountId);
    }
    
    
    sendMessageService(accId) { 
        publish(
            this.messageContext, 
            ACCMC, 
            { accountId: accId }
        );
    }
    



    
}