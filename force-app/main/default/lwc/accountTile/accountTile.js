import { LightningElement, api, track } from 'lwc';

// constants of css classes 
const TILE_CLASS = "tile-wrapper";
const TILE_SELECTED_CLASS = "tile-wrapper selected"; 

export default class AccountTile extends LightningElement {

    @api 
    account;

    @api
    selectedAccountId;

    get tileClass(){
        if (this.account.id == this.selectedAccountId) {
            return TILE_SELECTED_CLASS;
        }
        return TILE_CLASS;
    }

    selectAccount(){
        this.selectedAccountId == this.account.Id;
    }
}