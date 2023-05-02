import { LightningElement, wire, api, track} from 'lwc';

import getOpportunities from '@salesforce/apex/AccountServices.getOpportunities';

import ACCMC from '@salesforce/messageChannel/AccountServices__c';
import { subscribe, APPLICATION_SCOPE, MessageContext } from 'lightning/messageService';


export default class OpportinitiesList extends LightningElement {

    subscription = null;

    accountId;  

    opps;

    @track
    oppsEmpty;

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

    @wire(getOpportunities, {accID : '$accountId'})
    wiredOpps({data, error}){
        if (data) {
            this.opps = data;
            console.log("Wired opps ==> " + this.opps.length);
            if (this.opps.length === 0) {
                this.oppsEmpty = true;
            } else {
                this.oppsEmpty = false;
            }
            
        } else if (error) {
            console.log("ERROR");
        }
    
    }



   
    

}