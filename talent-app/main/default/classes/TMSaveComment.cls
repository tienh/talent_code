public class TMSaveComment {
    @AuraEnabled
	public static void saveComment (String Tag, String Comment) {
        Comment_Tag__c commentTag = new Comment_Tag__c();
        commentTag.Name = 'プロジェクト管理';
        
        insert commentTag;
    }
}