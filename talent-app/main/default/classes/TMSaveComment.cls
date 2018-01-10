public class TMSaveComment {
    @AuraEnabled
	public static List<Tag__c> getTags () {
    	return [SELECT ID, Name FROM Tag__c];
    }
    
    @AuraEnabled
	public static List<Object> addSkillComment (String createById, String employeeId, String typeId, String modeId, String selectedTagsId, String comment) {
        List<Object> result = new List<Object>();
        Map<String, List<Skill_Comment__c>> mapComment = new Map<String, List<Skill_Comment__c>>();
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
            result.Add(message);
            mapComment.put(String.valueOf(item.Create_When__c.year()), getSkillComment(item.Id));
            result.Add(mapComment);
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
	public static List<Object> addPersonalityComment (String createById, String employeeId, String typeId, String modeId, String selectedTagsId, String comment) {
        List<Object> result = new List<Object>();
        Map<String, List<Personality_Comment__c>> mapComment = new Map<String, List<Personality_Comment__c>>();
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
            result.Add(message);
            mapComment.put(String.valueOf(item.Create_When__c.year()), getPersonalityComment(item.Id));
            result.Add(mapComment);
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
	public static List<Object> editSkillComment (Id itemId, String selectedTagsId, String comment) {
        List<Object> result = new List<Object>();
        Map<String, List<Skill_Comment__c>> mapComment = new Map<String, List<Skill_Comment__c>>();
        Savepoint savePoint = Database.setSavepoint();
        TMResponseMessage message = new TMResponseMessage();
        
        if (!TMHome.isManager()) {
            message.status = 'error';
            message.message = '権限がない。';
            result.Add(message);
            return result;
        }
        
        List<Skill_Comment__c> item = getSkillComment(itemId);
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
        
        String[] arrSelectedTagsId = selectedTagsId.split(';');
        try
        {
            DateTime current = system.now();
            item[0].Name = comment;
            item[0].Last_Modified_When__c = current;
            update item;
            
            List<Comment_Tag__c> lstInsertCommentTag = new List<Comment_Tag__c>();
            for (Id tagId : arrSelectedTagsId) {
                if ([SELECT Id 
                     FROM Comment_Tag__c 
                     WHERE Comment_ID__c = :item[0].Id 
                     	AND Tag_ID__c = :tagId
       			].isEmpty()) {
                    lstInsertCommentTag.Add(new Comment_Tag__c(
                        Name = Id.valueOf(item[0].Id) + '-' + Id.valueOf(tagId),
                        Comment_ID__c = item[0].Id,
                        Tag_ID__c = tagId
                    ));
                }
            }
            insert lstInsertCommentTag;
            
            List<Comment_Tag__c> lstDeleteCommentTag = [
                SELECT ID 
                FROM Comment_Tag__c 
                WHERE Comment_ID__c = :item[0].Id 
                	AND Tag_ID__c NOT IN: arrSelectedTagsId
            ];
            delete lstDeleteCommentTag;
            
            message.status = 'OK';
            result.Add(message);
            mapComment.put(String.valueOf(item[0].Create_When__c.year()), getSkillComment(item[0].Id));
            result.Add(mapComment);
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
	public static List<Object> editPersonalityComment (Id itemId, String selectedTagsId, String comment) {
        List<Object> result = new List<Object>();
        Map<String, List<Personality_Comment__c>> mapComment = new Map<String, List<Personality_Comment__c>>();
        Savepoint savePoint = Database.setSavepoint();
        TMResponseMessage message = new TMResponseMessage();
        
        if (!TMHome.isManager()) {
            message.status = 'error';
            message.message = '権限がない。';
            result.Add(message);
            return result;
        }
        
        List<Personality_Comment__c> item = getPersonalityComment(itemId);
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
        
        String[] arrSelectedTagsId = selectedTagsId.split(';');
        try
        {
            DateTime current = system.now();
            item[0].Name = comment;
            item[0].Last_Modified_When__c = current;
            update item;
            
            List<Personality_Comment_Tag__c> lstInsertCommentTag = new List<Personality_Comment_Tag__c>();
            for (Id tagId : arrSelectedTagsId) {
                if ([SELECT Id 
                     FROM Personality_Comment_Tag__c 
                     WHERE Comment_ID__c = :item[0].Id 
                     	AND Tag_ID__c = :tagId
       			].isEmpty()) {
                    lstInsertCommentTag.Add(new Personality_Comment_Tag__c(
                        Name = Id.valueOf(item[0].Id) + '-' + Id.valueOf(tagId),
                        Comment_ID__c = item[0].Id,
                        Tag_ID__c = tagId
                    ));
                }
            }
            insert lstInsertCommentTag;
            
            List<Personality_Comment_Tag__c> lstDeleteCommentTag = [
                SELECT ID 
                FROM Personality_Comment_Tag__c 
                WHERE Comment_ID__c = :item[0].Id 
                	AND Tag_ID__c NOT IN: arrSelectedTagsId
            ];
            delete lstDeleteCommentTag;
            
            message.status = 'OK';
            result.Add(message);
            mapComment.put(String.valueOf(item[0].Create_When__c.year()), getPersonalityComment(item[0].Id));
            result.Add(mapComment);
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
    public static List<Object> deleteSkillComment(Id itemId) {
        List<Object> result = new List<Object>();
        Savepoint savePoint = Database.setSavepoint();
        TMResponseMessage message = new TMResponseMessage();
        
        if (!TMHome.isManager()) {
            message.status = 'error';
            message.message = '権限がない。';
            result.Add(message);
            return result;
        }
        
        List<Skill_Comment__c> item = getSkillComment(itemId);
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
            delete [SELECT ID from Comment_Tag__c WHERE Comment_ID__c = :item[0].Id];
            
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
    public static List<Object> deletePersonalityComment(Id itemId) {
        List<Object> result = new List<Object>();
        Savepoint savePoint = Database.setSavepoint();
        TMResponseMessage message = new TMResponseMessage();
        
        if (!TMHome.isManager()) {
            message.status = 'error';
            message.message = '権限がない。';
            result.Add(message);
            return result;
        }
        
       	List<Personality_Comment__c> item = getPersonalityComment(itemId);
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
            delete [SELECT ID from Personality_Comment_Tag__c WHERE Comment_ID__c = :item[0].Id];
            
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
    public static List<Skill_Comment__c> getSkillComment(Id itemId) {
        return [SELECT 
                Skill_Comment__c.ID,
                Create_When__c,
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
                Create_When__c,
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
}