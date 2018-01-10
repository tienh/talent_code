public class TMSkillCRUD {
    /***********************************/
    /******              SELECT               ******/
    /***********************************/
    /* Count number of indivisual Skills */
    public integer toCountSkill(Id employeeId) {
        String query = 'SELECT COUNT() ' +
            'FROM Employee_Skill__c ' +
            'WHERE Employee__c = :employeeId';
        integer count= Database.countQuery(query);
        return count;
    }
    
    /* Get list all Employee Skills group by Skill types */
    public List<Object> toGetListSkills(Id employeeId) {
        return toGetListSkills(employeeId, null);
    }
    
    /* Get list all Project Skills group by Skill types */
    public List<Object> toGetListSkills(Id employeeId, Id projectId) {
        List<Object> resultObj = new List<Object>();
        List<Skill_Type__c> typeList = toFetchSkillType();
        
        for (Skill_Type__c typeItem : typeList) {
            List<Object> result = new List<Object>();
            Map<String, Object> mapObj = new Map<String, Object>();
            // Get info by Skill type
            result = projectId == null ? fetchSkill(employeeId, typeItem.Id) : fetchPJSkill(employeeId, projectId, typeItem.Id);
            // Put data to map
            mapObj.put('key', typeItem);
            mapObj.put('value', result);
            // Assign to list
            resultObj.add(mapObj);
        }
        
        return resultObj;
    }
    
    /* Get list all Employee Skills of each Projects  */
    public List<Object> toGetListPJSkills(Id employeeId) {
        List<Object> resultPJObj = new List<Object>();
        List<Employee_Project__c> pjList = toFetchProject(employeeId);
        
        for (Employee_Project__c pjItem : pjList) {
            Map<String, Object> mapObj = new Map<String, Object>();
            // Get info
        	List<Object> resultObj = toGetListSkills(employeeId, pjItem.Id);
            // Put data to map
            mapObj.put('key', pjItem);
            mapObj.put('value', resultObj);
            // Assign to list
            resultPJObj.add(mapObj);
        }
        
        return resultPJObj;
    }
	
    /* Get list all Skill types  */
    public List<Skill_Type__c> toFetchSkillType() {
        return [SELECT Id, Name, Order__c, Expanded__c, Icon_Disp__c  FROM Skill_Type__c ORDER BY Order__c];
    }
    
    /* Get list all Skill levels  */
    public List<Skill_Level__c> toFetchSkillLevel() {
        return [SELECT Id, Name, Skill_Num__c, Icon__c FROM Skill_Level__c ORDER BY Order__c];
	}
    
    /* Get list all Projects by EmpId  */
    public List<Employee_Project__c> toFetchProject(Id employeeId) {
        return [
            SELECT Employee__r.Name, Id, Name, Project__r.Name
            FROM Employee_Project__c
            WHERE Employee__c = :employeeId
        ];
    }
	
    /* Get list by Skill types */
    public List<Object> fetchSkill(Id employeeId, Id typeId) {
        String query = cmmFetchSkill();
        if (employeeId != null) {
            query += 'WHERE Employee__c = :employeeId ';
        }
        if (typeId != null) {
            query += 'AND Skill__r.Skill_Type__c = :typeId';
        }
        
        return Database.query(query);
    }
	
    /* Get list by Skill types */
    public List<Object> fetchPJSkill(Id employeeId, Id projectId, Id typeId) {
        String query = cmmFetchPJSkill();
        if (projectId != null) {
            query += 'WHERE Employee_Project__c = :projectId ';
        }
        if (typeId != null) {
            query += 'AND Employee_Skill__r.Skill__r.Skill_Type__c = :typeId';
        }
        
        return Database.query(query);
    }
 	
    /* Get Employee Skill info */
    public Employee_Skill__c getEmpSkill(String currId) {
        try {
            String query = cmmFetchSkill();
            query += 'WHERE Id = :currId ';
            return Database.query(query);
        } catch(Exception e) {
            throw new MyException(TMErrorMessage.ERR_EMPTY);
        }
    }
    
    /* Get Project Skill info */
    public Project_Skill__c getProjectSkill(String currId) {
        try {
            String query = cmmFetchPJSkill();
            query += 'WHERE Id = :currId ';
            return Database.query(query);
        } catch(Exception e) {
            throw new MyException(TMErrorMessage.ERR_EMPTY);
        }
    }
	
    
    /***********************************/
    /******       COMMON QUERY       ******/
    /***********************************/
    /* Common query for get Employee Skill info */
    private String cmmFetchSkill() {
        String query = '';
        query += 'SELECT Employee__r.Name, Id, Name, Skill__c, Skill_Level__c, ' +
            	'Skill__r.Name, Skill__r.Skill_Type__r.Name, ' +
            	'Skill__r.Skill_Type__r.Order__c, ' +
            	'Skill_Level__r.Name, Skill_Level__r.Skill_Num__c, ' +
            	'Type_Name_Disp__c, Skill_Name_Disp__c, Skill_Label_Ref__c, Skill_Value_Ref__c ' +
            'FROM Employee_Skill__c ';
        return query;
    }
    
    /* Common query for get Project Skill info */
    private String cmmFetchPJSkill() {
        String query = '';
        query += 'SELECT Employee__r.Name, Id, ' +
            	'Employee_Project__c, Employee_Project__r.Project__c, ' +
            	'Employee_Skill__r.Skill__c, Skill_Level__c, ' +
            	'Skill_Level__r.Skill_Num__c, ' +
            	'Employee_Project__r.Project__r.Name, ' +
            	'Employee_Skill__r.Skill__r.Name, ' +
            	'Employee_Skill__r.Skill__r.Skill_Type__r.Name, ' +
            	'Employee_Skill__r.Skill__r.Skill_Type__r.Order__c, ' +           
            	'Employee_Skill__r.Skill_Level__r.Name, ' +
            	'Employee_Skill__r.Skill_Level__r.Skill_Num__c, ' +
            	'Type_Name_Disp__c, Skill_Name_Disp__c, Skill_Label_Ref__c, Skill_Value_Ref__c ' +
            'FROM Project_Skill__c ';
        return query;
    }
}