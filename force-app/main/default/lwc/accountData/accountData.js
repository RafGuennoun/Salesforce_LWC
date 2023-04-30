import { LightningElement, wire, track } from 'lwc';

import ACCMC from '@salesforce/messageChannel/AccountServices__c';
import { subscribe, APPLICATION_SCOPE, MessageContext } from 'lightning/messageService';

import { getRecord, getFieldValue } from 'lightning/uiRecordApi';

import ACCOUNT_NAME from '@salesforce/schema/Account.Name';
import ACCOUNT_NUMBER from '@salesforce/schema/Account.AccountNumber';
import ACCOUNT_PHONE from '@salesforce/schema/Account.Phone';
import ACCOUNT_WEBSITE from '@salesforce/schema/Account.Website';
import ACCOUNT_TYPE from '@salesforce/schema/Account.Type';
import ACCOUNT_INDUSTRY from '@salesforce/schema/Account.Industry';
import ACCOUNT_ANNREV from '@salesforce/schema/Account.AnnualRevenue'; 

const ACCOUNT_FIELDS = [ACCOUNT_NAME ,ACCOUNT_NUMBER, ACCOUNT_PHONE, ACCOUNT_WEBSITE, ACCOUNT_TYPE, ACCOUNT_INDUSTRY, ACCOUNT_ANNREV];

export default class AccountData extends LightningElement {

    accountId;

    @track
    account;

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
    

    @wire(getRecord, { recordId: '$accountId', fields: ACCOUNT_FIELDS })
    getAccount({data, error}){
        if (data) {
            this.account = data;
        } else if (error) {
            console.log("ERROR");
        }
    }



}