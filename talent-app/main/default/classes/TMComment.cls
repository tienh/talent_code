public class TMComment {
    
	@AuraEnabled
   	public static List<Object> fetchSkillComment(Id employeeId, Id typeId, Id modeId, String top, String skip) {
        Integer iTop = Integer.valueOf(top);
       	Integer iSkip = Integer.valueOf(skip);
        String query = '';
        
        query += 'SELECT Skill_Comment__c.ID, ' +
            			'Create_When_Disp__c, ' +
                        'Create_By__r.Name, ' +
            			'Create_By__r.Employee_Hiring__r.Team__c, ' +
                        'LastModifiedById, ' +
                        'Last_Modified_When__c, ' +
                        'Name, ' +
            			'Skill_ID__c, ' +
                        'Skill_ID__r.Name, ' +
            			'Skill_Level_ID__c, ' +
                        'Skill_Level_ID__r.Name, ' +
            			'( SELECT Tag_ID__r.Name FROM Skill_Comments__r ) ' +
            'FROM Skill_Comment__c ' +
            'WHERE Employee_ID__c = :employeeID ' +
            'AND Skill_ID__c = :typeId ' +
            'AND Skill_Level_ID__c = :modeId ' +
            'ORDER BY Create_When__c DESC ' ;
        
        List<Object> result = new List<Object>();
        result.Add(Database.query(query).Size());
        query += 'LIMIT :iTop ' +
            'OFFSET :iSkip';
        result.Add(Database.query(query));
        
        return result;
	}
    
	@AuraEnabled
   	public static List<Object> fetchPersonalityComment(Id employeeId, Id typeId, Id modeId, String top, String skip) {
        Integer iTop = Integer.valueOf(top);
       	Integer iSkip = Integer.valueOf(skip);
        String query = '';
        
        query += 'SELECT Personality_Comment__c.ID, ' +
            			'Create_When_Disp__c, ' +
                        'Create_By__r.Name, ' +
            			'Create_By__r.Employee_Hiring__r.Team__c, ' +
                        'LastModifiedById, ' +
                        'Last_Modified_When__c, ' +
                        'Name, ' +
            			'Personality_Type_ID__c, ' +
                        'Personality_Type_ID__r.Name, ' +
            			'Personality_Method_ID__c, ' +
                        'Personality_Method_ID__r.Name, ' +
            			'( SELECT Tag_ID__r.Name FROM Personality_Comments__r ) ' +
            'FROM Personality_Comment__c ' +
            'WHERE Employee_ID__c = :employeeID ' +
            'AND Personality_Type_ID__c = :typeId ' +
            'AND Personality_Method_ID__c = :modeId ' +
            'ORDER BY Create_When__c DESC ' ;
        
        List<Object> result = new List<Object>();
        result.Add(Database.query(query).Size());
        query += 'LIMIT :iTop ' +
            'OFFSET :iSkip';
        result.Add(Database.query(query));
        
        return result;
	}
    
    @AuraEnabled
   	public static List<Object> fetchEvaluationComment(Id employeeId, Id skillId, Id skillLevelId, String top, String skip) {
        Integer iTop = Integer.valueOf(top);
       	Integer iSkip = Integer.valueOf(skip);
        String query = '';
        
        query += 'SELECT Personality_Comment__c.ID, ' +
            			'Create_When_Disp__c, ' +
                        'Create_By__r.Name, ' +
            			'Create_By__r.Employee_Hiring__r.Team__c, ' +
                        'LastModifiedById, ' +
                        'Last_Modified_When__c, ' +
                        'Name, ' +
            			'Personality_ID__c, ' +
                        'Personality_ID__r.Name, ' +
            			'Personality_Level_ID__c, ' +
                        'Personality_Level_ID__r.Name, ' +
            'FROM Personality_Comment__c ' +
            'WHERE Employee_ID__c = :employeeID ' +
            'AND Personality_ID__c = :skillId ' +
            'AND Personality_Level_ID__c = :skillLevelId ' +
            'ORDER BY Create_When__c DESC ' ;
        
        List<Object> result = new List<Object>();
        result.Add(Database.query(query).Size());
        query += 'LIMIT :iTop ' +
            'OFFSET :iSkip';
        result.Add(Database.query(query));
        
        return result;
	}
}