public class TMSaveComment {
    @AuraEnabled
	public static List<Comment_Tag__c> getTag () {
        return [SELECT ID__c, Content__c FROM Comment_Tag__c];
    }
    
    @AuraEnabled
	public static void saveComment (String Tag, String Comment) {
        /*Comment_Tag__c commentTag1 = new Comment_Tag__c();
        commentTag1.Content__c  = 'プロジェクト管理';
        insert commentTag1;
        
        Comment_Tag__c commentTag2 = new Comment_Tag__c();
        commentTag2.Content__c  = 'PHP';
        insert commentTag2;
        
        Comment_Tag__c commentTag3 = new Comment_Tag__c();
        commentTag3.Content__c  = 'アカウントマネジメント';
        insert commentTag3;
        
        Comment_Tag__c commentTag4 = new Comment_Tag__c();
        commentTag4.Content__c  = 'バックエンドテクノロジー';
        insert commentTag4;
        
        Comment_Tag__c commentTag5 = new Comment_Tag__c();
        commentTag5.Content__c  = '仕様設計';
        insert commentTag5;*/
        
        List<Comment_Tag__c> lstExistCommentTag = [SELECT Content__c FROM Comment_Tag__c WHERE Content__c = :Tag];
        
        if (lstExistCommentTag.IsEmpty())
        {
            
        }
    }
}