global with sharing class TMEmployee {
    /* Get all data or filter display with pagging */
    @AuraEnabled
    public static TMEmployeePaged findAll(String searchKey, Decimal pageSize, Decimal pageNumber) {
		Integer pSize = (Integer)pageSize;
        String key = '%' + searchKey + '%';
        Integer offset = ((Integer)pageNumber - 1) * pSize;
        TMEmployeePaged r =  new TMEmployeePaged();
        r.pageSize = pSize;
        r.page = (Integer) pageNumber;
        r.total = [SELECT count() FROM Employee__c
                      WHERE (Name LIKE :key OR rank__c LIKE :key)
                      ];
        r.employees = [SELECT Id, Name, user__c, User__r.Username, thumbnail__c, 
                       		Employee_Hiring__r.Job_Category__c, Employee_Hiring__r.Position__c, 
                       		Employee_Hiring__r.Rank__c, Employee_Hiring__r.Rank_Ref__c
                      FROM Employee__c
                      WHERE (Name LIKE :key OR Employee_Hiring__r.Rank__c LIKE :key)
                      ORDER BY user__c LIMIT :pSize OFFSET :offset];
        System.debug(r);
        return r;
    }

    /* Get all for display in List  */
    @AuraEnabled
    public static Object[] fetchAll() {
        return [
            SELECT Id, Name, Thumbnail__c
            FROM Employee__c
        ];
    }

	/* Get info by Id  */
    @AuraEnabled
    public static Object findById(Id employeeId) {
        return [
            SELECT Id, User__c, Employee_Hiring__c, Picture__c, 
            		Employee_Hiring__r.Rank__c, Employee_Hiring__r.Rating__c, 
            		Employee_Hiring__r.Job_Category__c, Employee_Hiring__r.Position__c, Employee_Hiring__r.Status__c, 
            		Employee_Hiring__r.Department__c, Employee_Hiring__r.Work_Location__c, 
            		Employee_Hiring__r.Current_Address__c, Employee_Hiring__r.ffs__c, 
            		Employee_Hiring__r.Tel__c, Employee_Hiring__r.Emergency_Contact__c, 
					Employee_Hiring__r.Email__c, Employee_Hiring__r.Hire_Date__c, 
					Employee_Hiring__r.Recent_Achievement__c, 
            		Employee_Hiring__r.Rating_Disp__c, Employee_Hiring__r.Favorite__c, 
            		Employee_Hiring__r.Rank_Ref__c, Employee_Hiring__r.Rank_Ref_CM__c, 
            		Employee_Hiring__r.Rating_Ref__c, Employee_Hiring__r.Rating_Ref_CM__c, 
            		Name, First_Name__c, Last_Name__c, First_Name_Kana__c, Last_Name_Kana__c,
            		Employee_Hiring__r.Hire_Date_Disp__c, Birthday_Disp__c, 
            		Brithday__c, Gender__c, Gender_Disp__c
            FROM Employee__c
            WHERE Id=:employeeId
        ];
    } 

}