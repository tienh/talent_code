({
	FetchSkillDataHelper: function(component, event) {
        var action = component.get("c.fetchSkill");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.resultSkill", response.getReturnValue());
            }
        });
        
        $A.enqueueAction(action);
    },
    
    FetchSkillLevelDataHelper: function(component, event) {
        var action = component.get("c.fetchSkillLevel");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.resultSkillLevel", response.getReturnValue());
            }
        });
        
        $A.enqueueAction(action);
    },
})