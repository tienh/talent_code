public class TMSearchComment {
	@AuraEnabled
   	public static List<EvaluationComment__c> searchComment(String DateFrom, String DateTo) {
        Date dt_from = DateFrom == null ? null : Date.parse (DateFrom);
        Date dt_to = DateTo == null ? null : Date.parse (DateTo);
      	List <EvaluationComment__c> lst = new List<EvaluationComment__c>();
         
        /*EvaluationComment__c cmn1 = new EvaluationComment__c();
        cmn1.DateComment__c = Date.newInstance(2017, 10, 1);
        cmn1.Department__c = 'Director';
        cmn1.SubDepartment__c = 'ADV-B';
        cmn1.Team__c = 'Fukuoka';
        cmn1.Branch__c = '福岡';
        cmn1.Comment__c = '福岡MGとしてよくやってくれている。今後は成果を出すことを意識してほしい。';
        cmn1.Author__c = 'zaki';
        lst.Add(cmn1);
         
        EvaluationComment__c cmn2 = new EvaluationComment__c();
        cmn2.dateComment__c = Date.newInstance(2017, 1, 1);
        cmn2.department__c = 'SE';
        cmn2.subDepartment__c = 'ADV-C';
        cmn2.team__c = '兎チーム';
        cmn2.branch__c = '東京';
        cmn2.comment__c = '今期の売り上げに大いに貢献してくれた。PMとしてのスキルが伸びてきている。';
        cmn2.author__c = 'suzuki';
        lst.Add(cmn2);
     
      	EvaluationComment__c cmn3 = new EvaluationComment__c();
        cmn3.dateComment__c = Date.newInstance(2016, 5, 1);
        cmn3.department__c = 'Director';
        cmn3.subDepartment__c = 'ADV-F';
        cmn3.team__c = 'Fukuoka';
        cmn3.branch__c = '福岡';
        cmn3.comment__c = 'Còn gì đâu ngoài linh hồn rách tả tơi này.';
        cmn3.author__c = 'Khang';
        lst.Add(cmn3);
        
        insert lst;*/
        
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