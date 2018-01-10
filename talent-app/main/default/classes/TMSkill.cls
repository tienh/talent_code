public class TMSkill {
	@AuraEnabled
   	public static List<Skill_Type__c> fetchSkill() {
       	return [SELECT Id, Name, Order__c, Expanded__c, Icon_Disp__c  FROM Skill_Type__c ORDER BY Order__c];
	}
    
    @AuraEnabled
   	public static List<Skill_Level__c> fetchSkillLevel() {
        return [SELECT Id, Name, Skill_Num__c, Icon__c FROM Skill_Level__c ORDER BY Order__c];
	}
}