import { LightningElement, wire} from 'lwc';

import ACCMC from '@salesforce/messageChannel/AccountServices__c';
import { subscribe, APPLICATION_SCOPE, MessageContext } from 'lightning/messageService';


export default class OpportinitiesList extends LightningElement {

    subscription = null;

    accountId;   

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

   
    

}