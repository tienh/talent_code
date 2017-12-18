public class TMHome {
	@AuraEnabled
    public static Employee__c getUserInfo() {
        return [
            SELECT ID, 
            	Name, 
            	Thumbnail__c,
            	User__c,
            	Employee_Hiring__r.Permission__r.Name 
            FROM Employee__c 
            WHERE User__c = :UserInfo.getUserId() 
            LIMIT 1
        ];
    }
    
    @AuraEnabled
    public static String[] customLogout() {
        return new String[] {
            'https://pnx-tm-dev-ed.my.salesforce.com',
            Site.getBaseInsecureUrl()
        };
    }
}