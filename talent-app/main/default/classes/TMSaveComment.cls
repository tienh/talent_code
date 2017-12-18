public class TMSaveComment {
    @AuraEnabled
	public static List<Tag__c> getTags () {
        return [SELECT ID, Name FROM Tag__c];
    }
    
    @AuraEnabled
	public static List<Object> saveSkillComment (String createById, String employeeId, String typeId, String modeId, String selectedTagsId, String comment) {
        List<Object> result = new List<Object>();
        Savepoint savePoint = Database.setSavepoint();
        TMResponseMessage message = new TMResponseMessage();
        
        if (!isManager())
        {
            message.status = 'error';
            message.message = '権限がない。';
            result.Add(JSON.serialize(message));
            return result;
        }
        
        try
        {
            DateTime current = system.today();
            Skill_Comment__c item = new Skill_Comment__c();
            item.Create_By__c = createById;
            item.Create_When__c = current;
            item.Employee_ID__c = employeeId;
            item.Last_Modified_When__c = current;
            item.Name = comment;
            item.Skill_ID__c = typeId;
            item.Skill_Level_ID__c  = modeId;
            insert item;
            
            List<Comment_Tag__c> lstCommentTag = new List<Comment_Tag__c>();
            for (Id tagId : selectedTagsId.split(';')) {
                lstCommentTag.Add(new Comment_Tag__c(
                    Name = Id.valueOf(item.Id) + '-' + Id.valueOf(tagId),
                    Comment_ID__c = item.Id,
                    Tag_ID__c = tagId
                ));
            }
            insert lstCommentTag;
            
            message.status = 'OK';
            result.Add(JSON.serialize(message));
            result.Add(getSkillComment(item.Id));
        }
        catch(Exception e)
        {
        	Database.rollback(savePoint);
            message.status = 'error';
            message.message = e.getMessage();
            result.Add(JSON.serialize(message));
        }
        
        return result;
    }
    
    @AuraEnabled
	public static List<Object> savePersonalityComment (String createById, String employeeId, String typeId, String modeId, String selectedTagsId, String comment) {
        List<Object> result = new List<Object>();
        Savepoint savePoint = Database.setSavepoint();
        TMResponseMessage message = new TMResponseMessage();
        
        if (!isManager())
        {
            message.status = 'error';
            message.message = '権限がない。';
            result.Add(JSON.serialize(message));
            return result;
        }
        
        try
        {
            DateTime current = system.today();
            Personality_Comment__c  item = new Personality_Comment__c();
            item.Create_By__c = createById;
            item.Create_When__c = current;
            item.Employee_ID__c = employeeId;
            item.Last_Modified_When__c = current;
            item.Name = comment;
            item.Personality_Type_ID__c = typeId;
            item.Personality_Method_ID__c  = modeId;
            insert item;
            
            List<Personality_Comment_Tag__c> lstCommentTag = new List<Personality_Comment_Tag__c>();
            for (Id tagId : selectedTagsId.split(';')) {
                lstCommentTag.Add(new Personality_Comment_Tag__c(
                    Name = Id.valueOf(item.Id) + '-' + Id.valueOf(tagId),
                    Comment_ID__c = item.Id,
                    Tag_ID__c = tagId
                ));
            }
            insert lstCommentTag;
            
            message.status = 'OK';
            result.Add(JSON.serialize(message));
            result.Add(getPersonalityComment(item.Id));
        }
        catch(Exception e)
        {
        	Database.rollback(savePoint);
            message.status = 'error';
            message.message = e.getMessage();
            result.Add(JSON.serialize(message));
        }
        
        return result;
    }
    
    @AuraEnabled
    public static List<Skill_Comment__c> getSkillComment(Id itemId) {
        return [SELECT 
                Skill_Comment__c.ID,
            	Create_When_Disp__c,
                Create_By__r.Name,
                Create_By__r.Employee_Hiring__r.Team__c,
                LastModifiedById,
                Last_Modified_When__c,
                Name,
                Skill_ID__c,
                Skill_ID__r.Name,
                Skill_Level_ID__c,
                Skill_Level_ID__r.Name,
                ( SELECT Tag_ID__r.Name FROM Skill_Comments__r )
            FROM Skill_Comment__c
            WHERE Id = :itemId
 		];
	}
    
    @AuraEnabled
    public static List<Personality_Comment__c> getPersonalityComment(Id itemId) {
        return [SELECT 
                Personality_Comment__c.ID,
            	Create_When_Disp__c,
                Create_By__r.Name,
                Create_By__r.Employee_Hiring__r.Team__c,
                LastModifiedById,
                Last_Modified_When__c,
                Name,
                Personality_Type_ID__c,
                Personality_Type_ID__r.Name,
            	Personality_Method_ID__c,
                Personality_Method_ID__r.Name,
                ( SELECT Tag_ID__r.Name FROM Personality_Comments__r )
            FROM Personality_Comment__c
            WHERE Id = :itemId
 		];
	}
    
    private static Boolean isManager() {
        Employee__c currentUser = [
            SELECT Employee_Hiring__r.Permission__r.Name 
            FROM Employee__c 
            WHERE User__c = :UserInfo.getUserId() 
            LIMIT 1
        ];
        
        return currentUser.Employee_Hiring__r.Permission__r.Name == 'Manager';
    }
}