public class EmployeePagedResult {

    @AuraEnabled
    public Integer pageSize { get;set; }
    
    @AuraEnabled
    public Integer page { get;set; }
    
    @AuraEnabled
    public Integer total { get;set; }
    
    @AuraEnabled
    public List<Employee__c> employees { get;set; }
    
}