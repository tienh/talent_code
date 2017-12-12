public class TMSearchComment {
	@AuraEnabled
   	public static List<EvaluationComment__c> searchComment(String DateFrom, String DateTo) {
        Date dt_from = DateFrom == null ? null : Date.parse (DateFrom);
        Date dt_to = DateTo == null ? null : Date.parse (DateTo);
      	List <EvaluationComment__c> lst = new List<EvaluationComment__c>();
        
        String query = '';
        query += 'SELECT DateComment__c, Department__c, SubDepartment__c, Team__c, Branch__c, Comment__c, Author__c FROM EvaluationComment__c ';
        if (dt_from != null && dt_to != null)
        {
            query += ' WHERE DateComment__c >= :dt_from AND DateComment__c <= :dt_to';
        }
        else if (dt_from != null) {
            query += ' WHERE DateComment__c >= :dt_from';
        }
        else if (dt_to != null) {
            query += ' WHERE DateComment__c <= :dt_to';
        }
        
       	lst = Database.query(query);
        return lst;
	}
}