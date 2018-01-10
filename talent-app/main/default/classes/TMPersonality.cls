public class TMPersonality {
    
    @AuraEnabled
   	public static List<Personality_Type__c> fetchPersonalityType() {
       	return [SELECT Id, Name, Order__c  FROM Personality_Type__c ORDER BY Order__c];
	}
    
    @AuraEnabled
   	public static List<Personality_Method__c> fetchPersonalityMethod() {
        return [SELECT Id, Name, Order__c, Icon__c FROM Personality_Method__c ORDER BY Order__c];
	}
}