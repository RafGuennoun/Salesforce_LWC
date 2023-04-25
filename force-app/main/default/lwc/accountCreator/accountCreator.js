import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

const OBJECT_NAME = "Account";

export default class AccountCreator extends NavigationMixin(LightningElement) {

    createAccount(){
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName:OBJECT_NAME,
                actionName: 'new'
            }
        });
    }

}