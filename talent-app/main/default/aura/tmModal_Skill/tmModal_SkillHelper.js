({
    BindValueHelper: function(component, event) {
        var relObj = component.get("v.relObject");
        
        component.set("v.skillId", component.get("v.isPJ") ? 
                      relObj.Employee_Skill__c : relObj.Skill__c);
        component.set("v.skillLevel", relObj.Skill_Level__c);
        component.set("v.skillName", relObj.Skill_Name_Disp__c);
    },
    
    UpdateValueHelper: function(component, event) {
        var dynamicCmp = component.find("InputSelectSkill");
        var action = component.get("v.isPJ") ? 
            component.get("c.saveProjectSkill") : component.get("c.saveEmpSkill");
        action.setParams({
            'currId': component.get("v.relObject").Id,
            'employeeId': component.get("v.recordId"),
            'skillId': component.get("v.skillId"),
            'skillLevelId': dynamicCmp.get("v.value")
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            var toastEvent = $A.get("e.force:showToast");
            
            //debugger; // the JS debugger will pause here
            if (state === "SUCCESS") {
                var resultSet = response.getReturnValue();
                if (resultSet.errCode == 0) {
                    component.set("v.relObject", resultSet.result);
                }

                toastEvent.setParams({
                    "title": resultSet.errTitle,
                    "message": resultSet.message,
                    "type": resultSet.errType
                });
                toastEvent.fire();
            }
        });
        $A.enqueueAction(action);
    }
    
})