public with sharing class AccountServices {
  
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(){
        List<Account> accs = [select Name, AnnualRevenue, Phone from Account];
        return accs;
    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(Id accID){
        List<Contact> conts = [select Name, Email, Phone from Contact where AccountId = :accID];
        return conts;
    } 

    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getOpportunities(Id accID){
        List<Opportunity> opps = [select Name, CloseDate, StageName from Opportunity where AccountId = :accID];
        return opps;
    } 
    
}