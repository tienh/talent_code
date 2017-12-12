({
	FetchDataHelper: function(component, event) {
        var action = component.get("c.fetchSkillComment");
        action.setParams({
            'employeeId': component.get("v.recordId"),
            'skillId': component.get("v.skillId"),
            'skillLevelId': component.get("v.skillLevelId"),
            'top': component.get("v.top"),
            'skip': component.get("v.skip")
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.count", response.getReturnValue()[0]);
                component.set("v.result", response.getReturnValue()[1]);
            }
        });
        
        $A.enqueueAction(action);
    },
    
    GetMoreDataHelper: function(component, event) {
        var action = component.get("c.fetchSkillComment");
        component.set("v.skip", (parseInt(component.get("v.skip")) + parseInt(component.get("v.top"))).toString());
        action.setParams({
            'employeeId': component.get("v.recordId"),
            'skillId': component.get("v.skillId"),
            'skillLevelId': component.get("v.skillLevelId"),
            'top': component.get("v.top"),
            'skip': component.get("v.skip")
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.count", response.getReturnValue()[0]);
                component.set("v.result", component.get("v.result").concat(response.getReturnValue()[1]));
            }
        });
        
        $A.enqueueAction(action);
    }
})