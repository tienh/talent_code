public class TMRSSCRUD {
    /***********************************/
    /******         Employee Skill         ******/
    /***********************************/
    /* Insert Employee Skill  */
    public TMMessage toSaveEmpSkill(String employeeId, String skillId, String skillLevelId) {
        return toSaveEmpSkill(null, employeeId, skillId, skillLevelId);
    }
    
    /* Update Employee Skill  */
    public TMMessage toSaveEmpSkill(String currId, String employeeId, String skillId, String skillLevelId) {
        Savepoint savePoint = Database.setSavepoint();
        TMMessage resultSet = new TMMessage();
        TMValidate validate = new TMValidate();
        TMSkillCRUD skillModal = new TMSkillCRUD();
        
        try {
            // Validate parameters
            validate.checkAuthorized(employeeId);
            
            if (currId == null) {	// Add
                Employee_Skill__c empSkill = new Employee_Skill__c();
                empSkill.Employee__c = employeeId;
                empSkill.Skill__c = skillId;
                empSkill.Skill_Level__c = skillLevelId;
                insert empSkill;
                // Get back data for display on UI
                resultSet.result = skillModal.getEmpSkill(empSkill.Id);
                
            } else {	// Update
                Employee_Skill__c empSkill = skillModal.getEmpSkill(currId);
                if (employeeId != null) empSkill.Employee__c = employeeId;
                if (skillId != null) empSkill.Skill__c = skillId;
                if (skillLevelId != null) empSkill.Skill_Level__c = skillLevelId;
                update empSkill;
                // Get back data for display on UI
                resultSet.result = skillModal.getEmpSkill(empSkill.Id);
            }
            
        } catch(Exception e) {
            Database.rollback(savePoint);
            resultSet.setErrMessage(e.getMessage());
        }
        
        return resultSet;
    }
    
    
    /***********************************/
    /******           Project Skill           ******/
    /***********************************/
    /* Insert Project Skill  */
    public TMMessage toSaveProjectSkill(String employeeId, String projectId, String empSkillId, String skillLevelId) {
        return toSaveProjectSkill(null, employeeId, projectId, empSkillId, skillLevelId);
    }
    
    /* Update Project Skill  */
    public TMMessage toSaveProjectSkill(String currId, String employeeId, String projectId, String empSkillId, String skillLevelId) {
        Savepoint savePoint = Database.setSavepoint();
        TMMessage resultSet = new TMMessage();
        TMValidate validate = new TMValidate();
        TMSkillCRUD skillModal = new TMSkillCRUD();
        
        try {
            // Validate parameters
            validate.checkAuthorized(employeeId);
            
            if (currId == null) {	// Add
                Project_Skill__c pjSkill = new Project_Skill__c();
                pjSkill.Employee__c = employeeId;
                pjSkill.Employee_Project__c = projectId;
                pjSkill.Employee_Skill__c = empSkillId;
                pjSkill.Skill_Level__c = skillLevelId;
                insert pjSkill;
                // Get back data for display on UI
                resultSet.result = skillModal.getProjectSkill(pjSkill.Id);
                
            } else {	// Update
                Project_Skill__c pjSkill = skillModal.getProjectSkill(currId);
                if (employeeId != null) pjSkill.Employee__c = employeeId;
                if (projectId != null) pjSkill.Employee_Project__c = projectId;
                if (empSkillId != null) pjSkill.Employee_Skill__c = empSkillId;
                if (skillLevelId != null) pjSkill.Skill_Level__c = skillLevelId;
                update pjSkill;
                // Get back data for display on UI
                resultSet.result = skillModal.getProjectSkill(pjSkill.Id);
            }
            
        } catch(Exception e) {
            Database.rollback(savePoint);
            resultSet.setErrMessage(e.getMessage());
        }
        
        return resultSet;
    }
}