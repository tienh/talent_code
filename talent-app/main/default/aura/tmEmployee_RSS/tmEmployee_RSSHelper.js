({
    CountSkillHelper: function(component, event) {
        var action = component.get("c.countSkill");
        action.setParams({ 'employeeId': component.get("v.recordId") });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.counter", response.getReturnValue());
                //debugger; // the JS debugger will pause here
            }
        });
        
        $A.enqueueAction(action);
    },
    
	FetchSkillTypeDataHelper: function(component, event) {
        var action = component.get("c.fetchSkillType");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.rstSkillType", response.getReturnValue());
            }
        });
        
        $A.enqueueAction(action);
    },
    
    FetchProjectDataHelper: function(component, event) {
        var action = component.get("c.fetchProject");
        action.setParams({ 'employeeId': component.get("v.recordId") });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.rstProject", response.getReturnValue());
                //debugger; // the JS debugger will pause here
            }
        });
        
        $A.enqueueAction(action);
    },
    
})