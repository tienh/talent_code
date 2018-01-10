public class TMComment {
    
	@AuraEnabled
   	public static List<Object> fetchSkillComment(Id employeeId, Id typeId, Id modeId, String year) {
        List<Object> result = new List<Object>();

        result.Add([
            SELECT COUNT_DISTINCT(Create_When__c) numOfYear
            FROM Skill_Comment__c 
            WHERE Employee_ID__c = :employeeID
            	AND Skill_ID__c = :typeId
            	AND Skill_Level_ID__c = :modeId
            	AND CALENDAR_YEAR (Create_When__c) < :Integer.valueOf(year)
            GROUP BY CALENDAR_YEAR(Create_When__c)
        ].Size());
        result.Add([
            SELECT 
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
            WHERE Employee_ID__c = :employeeID
            AND Skill_ID__c = :typeId
            AND Skill_Level_ID__c = :modeId
            AND CALENDAR_YEAR (Create_When__c) = :Integer.valueOf(year)
            ORDER BY Create_When__c DESC
        ]);
        
        return result;
	}
    
	@AuraEnabled
   	public static List<Object> fetchPersonalityComment(Id employeeId, Id typeId, Id modeId, String year) {
        List<Object> result = new List<Object>();
        
        result.Add([
            SELECT COUNT_DISTINCT(Create_When__c) numOfYear
            FROM Personality_Comment__c
            WHERE Employee_ID__c = :employeeID
            	AND Personality_Type_ID__c = :typeId
            	AND Personality_Method_ID__c = :modeId
            	AND CALENDAR_YEAR (Create_When__c) < :Integer.valueOf(year)
            GROUP BY CALENDAR_YEAR(Create_When__c)
        ].Size());
        result.Add([
            SELECT 
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
            WHERE Employee_ID__c = :employeeID
            	AND Personality_Type_ID__c = :typeId
            	AND Personality_Method_ID__c = :modeId
            	AND CALENDAR_YEAR(Create_When__c) = :Integer.valueOf(year)
            ORDER BY Create_When__c DESC
        ]);
        
        return result;
	}
}