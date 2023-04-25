import { LightningElement, wire, track } from 'lwc';
import getAccounts from '@salesforce/apex/AccountServices.getAccounts';

export default class AccountsList extends LightningElement {

    @track
    accounts; 

    @wire(getAccounts)
    wiredAccounts({data, error }){
        if (data) {
            this.accounts = data;
        } else if (error){
            console.log("Error in the account list ");
        }
    }
    
}