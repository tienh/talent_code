public class TMEvaluationComment {
    public static Employee__c currentUser;
    
    public TMEvaluationComment() {
        currentUser = TMHome.getUserInfo();
    }
    
    private static Integer calculateSkillComment(Id employeeId, Id modeId, String dateFrom, String dateTo) {
        System.debug(dateFrom);
        Date dtFrom = dateFrom == null ? null : Date.parse (dateFrom);
        Date dtTo = dateTo == null ? null : Date.parse (dateTo);
        
        String query = '';
        query += 'SELECT ID ' +
            'FROM Skill_Comment__c ' +
            'WHERE Employee_ID__c = :employeeID ' +
            'AND Skill_Level_ID__c = :modeId ';
        if (dtFrom != null && dtTo != null)
        {
            query += 'AND Create_When__c >= :dtFrom AND Create_When__c <= :dtTo ';
        }
        else if (dtFrom != null) {
            query += 'AND Create_When__c >= :dtFrom ';
        }
        else if (dtTo != null) {
            query += 'AND Create_When__c <= :dtTo ';
        }
        
       	return Database.query(query).Size();
    }
    
    private static Integer calculatePersonalityComment(Id employeeId, String dateFrom, String dateTo) {
        System.debug(dateFrom);
        Date dtFrom = dateFrom == null ? null : Date.parse (dateFrom);
        Date dtTo = dateTo == null ? null : Date.parse (dateTo);
        
        String query = '';
        query += 'SELECT ID ' +
            'FROM Personality_Comment__c ' +
            'WHERE Employee_ID__c = :employeeID ';
        if (dtFrom != null && dtTo != null)
        {
            query += 'AND Create_When__c >= :dtFrom AND Create_When__c <= :dtTo ';
        }
        else if (dtFrom != null) {
            query += 'AND Create_When__c >= :dtFrom ';
        }
        else if (dtTo != null) {
            query += 'AND Create_When__c <= :dtTo ';
        }
        
       	return Database.query(query).Size();
    }
    
    @AuraEnabled
   	public static TMEvaluation evaluateComment(Id employeeId, String dateFrom, String dateTo) {
        Id motivatedLevel = [SELECT Id FROM Skill_Level__c WHERE Skill_Num__c = 1 LIMIT 1].Id;
        Id goodLevel = [SELECT Id FROM Skill_Level__c WHERE Skill_Num__c = 3 LIMIT 1].Id;
        Id excellentLevel = [SELECT Id FROM Skill_Level__c WHERE Skill_Num__c = 4 LIMIT 1].Id;
            
        TMEvaluation result = new TMEvaluation();
        result.achievement = calculateSkillComment(employeeId, excellentLevel, dateFrom, dateTo) * 2 + calculateSkillComment(employeeId, goodLevel, dateFrom, dateTo);
        result.obliging = calculatePersonalityComment(employeeId, dateFrom, dateTo);
        result.achievementOfTask = calculateSkillComment(employeeId, motivatedLevel, dateFrom, dateTo) + calculateSkillComment(employeeId, excellentLevel, dateFrom, dateTo);

        return result;
    }
    
	@AuraEnabled
   	public static List<EvaluationComment__c> fetchEvaluationComment(Id employeeId, String dateFrom, String dateTo) {
        Date dtFrom = dateFrom == null ? null : Date.parse (dateFrom);
        Date dtTo = dateTo == null ? null : Date.parse (dateTo);
      	List <EvaluationComment__c> lstComment = new List<EvaluationComment__c>();
        
        String query = '';
        query += 'SELECT ID, ' +
            			'Create_When_Disp__c, ' +
                        'Create_By__r.Name, ' +
                        'Create_By__r.Employee_Hiring__r.Job_Category__c, ' +
                        'Create_By__r.Employee_Hiring__r.Position__c, ' +
                        'Create_By__r.Employee_Hiring__r.Team__c, ' +
            			'Create_By__r.Employee_Hiring__r.Work_Location__c, ' +
                        'LastModifiedById, ' +
                        'Last_Modified_When__c, ' +
                        'Name ' +
            	'FROM EvaluationComment__c ' +
            	'WHERE Employee_ID__c = :employeeID ';
        if (dtFrom != null && dtTo != null)
        {
            query += 'AND Create_When__c >= :dtFrom AND Create_When__c <= :dtTo ';
        }
        else if (dtFrom != null) {
            query += 'AND Create_When__c >= :dtFrom ';
        }
        else if (dtTo != null) {
            query += 'AND Create_When__c <= :dtTo ';
        }
        query += 'ORDER BY Create_When__c DESC';
        
       	lstComment = Database.query(query);
        return lstComment;
	}
    
    @AuraEnabled
	public static List<Object> addEvaluationComment (String createById, String employeeId, String comment) {
        List<Object> result = new List<Object>();
        Savepoint savePoint = Database.setSavepoint();
        TMResponseMessage message = new TMResponseMessage();
        
        if (!TMHome.isManager()) {
            message.status = 'error';
            message.message = '権限がない。';
            result.Add(message);
            return result;
        }
        
        try
        {
            DateTime current = system.now();
            EvaluationComment__c item = new EvaluationComment__c();
            item.Create_By__c = createById;
            item.Create_When__c = current;
            item.Employee_ID__c = employeeId;
            item.Last_Modified_When__c = current;
            item.Name = comment;
            insert item;
            
            message.status = 'OK';
            result.Add(message);
            result.Add(getEvaluationComment(item.Id));
        }
        catch(Exception e)
        {
        	Database.rollback(savePoint);
            message.status = 'error';
            message.message = e.getMessage();
            result.Add(message);
        }
        
        return result;
    }
    
    @AuraEnabled
	public static List<Object> editEvaluationComment (Id itemId, String comment) {
        List<Object> result = new List<Object>();
        Savepoint savePoint = Database.setSavepoint();
        TMResponseMessage message = new TMResponseMessage();
        
        if (!TMHome.isManager()) {
            message.status = 'error';
            message.message = '権限がない。';
            result.Add(message);
            return result;
        }
        
        List<EvaluationComment__c> item = getEvaluationComment(itemId);
        if (item.isEmpty()) {
            message.status = 'error';
            message.message = 'データが存在していません。';
            result.Add(message);
            return result;
        }
        if(TMHome.getCurrentUser().Id != item[0].Create_By__c) {
            message.status = 'error';
            message.message = 'このデータに権限がない。';
            result.Add(message);
            return result;
        }
        
        try
        {
            DateTime current = system.now();
            item[0].Name = comment;
            item[0].Last_Modified_When__c = current;
            update item;
            
            message.status = 'OK';
            result.Add(message);
            result.Add(getEvaluationComment(item[0].Id));
        }
        catch(Exception e)
        {
        	Database.rollback(savePoint);
            message.status = 'error';
            message.message = e.getMessage();
            result.Add(message);
        }
        
        return result;
    }
    
    @AuraEnabled
    public static List<Object> deleteEvaluationComment(Id itemId) {
        List<Object> result = new List<Object>();
        Savepoint savePoint = Database.setSavepoint();
        TMResponseMessage message = new TMResponseMessage();
        
        if (!TMHome.isManager()) {
            message.status = 'error';
            message.message = '権限がない。';
            result.Add(message);
            return result;
        }
        
        List<EvaluationComment__c> item = getEvaluationComment(itemId);
        if (item.isEmpty()) {
            message.status = 'error';
            message.message = 'データが存在していません。';
            result.Add(message);
            return result;
        }
        if(TMHome.getCurrentUser().Id != item[0].Create_By__c) {
            message.status = 'error';
            message.message = 'このデータに権限がない。';
            result.Add(message);
            return result;
        }
        
        try
        {
            delete item;
            
            message.status = 'OK';
            result.Add(message);
        }
        catch(Exception e)
        {
        	Database.rollback(savePoint);
            message.status = 'error';
            message.message = e.getMessage();
            result.Add(message);
        }
        
        return result;
	}
    
    @AuraEnabled
    public static List<EvaluationComment__c> getEvaluationComment(Id itemId) {
        return [SELECT ID, 
                Create_When_Disp__c,
                Create_By__r.Name,
                Create_By__r.Employee_Hiring__r.Job_Category__c,
                Create_By__r.Employee_Hiring__r.Position__c,
                Create_By__r.Employee_Hiring__r.Team__c,
                Create_By__r.Employee_Hiring__r.Work_Location__c,
                LastModifiedById, 
                Last_Modified_When__c,
                Name
            FROM EvaluationComment__c
            WHERE Id = :itemId
 		];
	}
}