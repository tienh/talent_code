({
	FetchDataHelper: function(component, event) {
        //debugger; // the JS debugger will pause here
        var empId = component.get("v.recordId");
        var projectId = component.get("v.projectId");
        var typeId = component.get("v.typeId");
        var isPJScope = false;
        
        if (projectId != null) {
            isPJScope = true;
        }
        
        var action;
        if (isPJScope) {
            action = component.get("c.fetchProjectSkill");
            action.setParams({
                'employeeId': empId,
                'projectId': projectId,
                'typeId': typeId
            });
        } else {
            action = component.get("c.fetchSkill");
            action.setParams({
                'employeeId': empId,
                'typeId': typeId
            });
        }
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.length", response.getReturnValue()[0]);
                component.set("v.result", response.getReturnValue()[1]);
                //console.log(response.getReturnValue()[1]);
            }
        });
        
        $A.enqueueAction(action);
    },
})