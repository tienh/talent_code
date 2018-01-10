public class TMRSSController {
    /* Count number of indivisual Skills */
    @AuraEnabled
    public static Integer countSkill(Id employeeId) {
        TMSkillCRUD skillModal = new TMSkillCRUD();
        return skillModal.toCountSkill(employeeId);
    }
    
    /* Get list all Skill types  */
    @AuraEnabled
    public static List<Skill_Type__c> fetchSkillType() {
        TMSkillCRUD skillModal = new TMSkillCRUD();
        return skillModal.toFetchSkillType();
    }
    
    /* Get list all Skill levels  */
    @AuraEnabled
    public static List<Skill_Level__c> fetchSkillLevel() {
        TMSkillCRUD skillModal = new TMSkillCRUD();
        return skillModal.toFetchSkillLevel();
	}
    
    /* Get all Employee Skills  */
    @AuraEnabled
    public static List<Object> getListEmpSkills(String employeeId) {
        TMSkillCRUD skillModal = new TMSkillCRUD();
        return skillModal.toGetListSkills(employeeId);
    }
    
    /* Insert Employee Skill  */
    @AuraEnabled
    public static TMMessage saveEmpSkill(String employeeId, String skillId, String skillLevelId) {
        TMRSSCRUD modal = new TMRSSCRUD();
        return modal.toSaveEmpSkill(employeeId, skillId, skillLevelId);
    }
    
    /* Update Employee Skill  */
    @AuraEnabled
    public static TMMessage saveEmpSkill(String currId, String employeeId, String skillId, String skillLevelId) {
        TMRSSCRUD modal = new TMRSSCRUD();
        return modal.toSaveEmpSkill(currId, employeeId, skillId, skillLevelId);
    }
    
    /* Get all Project Skills  */
    @AuraEnabled
    public static List<Object> getListProjectSkills(String employeeId) {
        TMSkillCRUD skillModal = new TMSkillCRUD();
        return skillModal.toGetListPJSkills(employeeId);
    }
    
    /* Insert Project Skill  */
    @AuraEnabled
    public static TMMessage saveProjectSkill(String employeeId, String projectId, String skillId, String skillLevelId) {
        TMRSSCRUD modal = new TMRSSCRUD();
        return modal.toSaveProjectSkill(employeeId, projectId, skillId, skillLevelId);
    }
    
    /* Update Project Skill  */
    @AuraEnabled
    public static TMMessage saveProjectSkill(String currId, String employeeId, String projectId, String skillId, String skillLevelId) {
        TMRSSCRUD modal = new TMRSSCRUD();
        return modal.toSaveProjectSkill(currId, employeeId, projectId, skillId, skillLevelId);
    }
}