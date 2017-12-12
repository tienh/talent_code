public class TMRSS {
    /* Get RSS Skill info by Id  */
    @AuraEnabled
    public static Object getRSSSkill(Id employeeId) {
        return [
            SELECT Employee__r.Name, Id, Name, 
                	Skill__r.Name, Skill__r.Skill_Type__r.Name, 
            		Skill__r.Skill_Type__r.Order__c, 
                	Skill_Level__r.Name, Skill_Level__r.Skill_Num__c
            FROM Employee_Skill__c
            WHERE Employee__c = :employeeId
            ORDER BY Skill__r.Skill_Type__r.Order__c
        ];
    }
    
    /* Get RSS Project info by Id  */
    @AuraEnabled
    public static Object getRSSProject(Id employeeId) {
        return [
            SELECT Employee__r.Name, Id, Name, Project__r.Name, 
                    (
                        SELECT Employee_Skill__r.Skill__r.Name, 
                                Employee_Skill__r.Skill__r.Skill_Type__r.Name, 
                        		Employee_Skill__r.Skill__r.Skill_Type__r.Order__c, 
                                Employee_Skill__r.Skill_Level__r.Name, 
                                Employee_Skill__r.Skill_Level__r.Skill_Num__c
                        FROM Project_Skill__r
                        ORDER BY Employee_Skill__r.Skill__r.Skill_Type__r.Order__c
                    )
            FROM Employee_Project__c
            WHERE Employee__c = :employeeId
        ];
    }
    
    //--------------------------------------------------------------------//
    /* Get list all Skill types  */
    @AuraEnabled
    public static List<Skill_Type__c> fetchSkillType() {
        return TMSkill.fetchSkill();
    }
    
    /* Count number of indivisual Skills */
    @AuraEnabled
    public static integer countSkill(Id employeeId) {
        String query = 'SELECT COUNT() ' +
            'FROM Employee_Skill__c ' +
            'WHERE Employee__c = :employeeId';
        integer count= Database.countQuery(query);
        return count;
    }
    
    /* Get list Projects  */
    @AuraEnabled
    public static List<Object> fetchProject(Id employeeId) {
        return [
            SELECT Employee__r.Name, Id, Name, Project__r.Name
            FROM Employee_Project__c
            WHERE Employee__c = :employeeId
        ];
    }
    
    /* Get indivisual Skill info  */
    @AuraEnabled
    public static List<Object> fetchSkill(Id employeeId, Id typeId) {
        String query = '';
        query += 'SELECT Employee__r.Name, Id, Name, ' +
            	'Skill__r.Name, Skill__r.Skill_Type__r.Name, ' +
            	'Skill__r.Skill_Type__r.Order__c, ' +
            	'Skill_Level__r.Name, Skill_Level__r.Skill_Num__c ' +
            'FROM Employee_Skill__c ' +
            'WHERE Employee__c = :employeeId ' +
            	'AND Skill__r.Skill_Type__c = :typeId';
        
        List<Object> result = new List<Object>();
        result.Add(Database.query(query).Size());
        result.Add(Database.query(query));
        return result;
    }
    
    /* Get Skill info depend on each Project */
    @AuraEnabled
    public static List<Object> fetchProjectSkill(Id employeeId, Id projectId, Id typeId) {
        String query = '';
        query += 'SELECT Id, Skill_Level__r.Skill_Num__c, ' +
            	'Employee_Project__r.Project__r.Name, ' +
            	'Employee_Skill__r.Skill__r.Name, ' +
            	'Employee_Skill__r.Skill__r.Skill_Type__r.Name, ' +
            	'Employee_Skill__r.Skill__r.Skill_Type__r.Order__c, ' +           
            	'Employee_Skill__r.Skill_Level__r.Name, ' +
            	'Employee_Skill__r.Skill_Level__r.Skill_Num__c ' +
            'FROM Project_Skill__c ' +
            'WHERE Employee_Project__c = :projectId ' +
            	'AND Employee_Skill__r.Skill__r.Skill_Type__c = :typeId';
        
        List<Object> result = new List<Object>();
        result.Add(Database.query(query).Size());
        result.Add(Database.query(query));
        return result;
    }
}