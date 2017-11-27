global with sharing class EmployeeController {
	
    /* Get all data or filter display with pagging */
    @AuraEnabled
    public static EmployeePagedResult findAll(String searchKey, Decimal minPrice, Decimal maxPrice, Decimal pageSize, Decimal pageNumber) {
		Integer pSize = (Integer)pageSize;
        String key = '%' + searchKey + '%';
        Integer offset = ((Integer)pageNumber - 1) * pSize;
        EmployeePagedResult r =  new EmployeePagedResult();
        r.pageSize = pSize;
        r.page = (Integer) pageNumber;
        r.total = [SELECT count() FROM Employee__c
                      WHERE (Name LIKE :key OR rank__c LIKE :key)
                      ];
        r.employees = [SELECT Id, Name, user__c, User__r.Username,
                       		job__c, job_title__c, rank__c, recent_achievement__c,
                            thumbnail__c, Rank_Ref__c
                      FROM Employee__c
                      WHERE (Name LIKE :key OR rank__c LIKE :key)
                      ORDER BY user__c LIMIT :pSize OFFSET :offset];
        System.debug(r);
        return r;
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
            		Employee_Hiring__r.Rating_Disp__c, 
            		Employee_Hiring__r.Rank_Ref_CM__c, Employee_Hiring__r.Rating_Ref_CM__c, 
            		Name, First_Name__c, Last_Name__c, First_Name_Kana__c, Last_Name_Kana__c,
            		Employee_Hiring__r.Hire_Date_Disp__c, Birthday_Disp__c, 
            		Brithday__c, Gender__c, Gender_Disp__c
            FROM Employee__c
            WHERE Id=:employeeId
        ];
    }
}