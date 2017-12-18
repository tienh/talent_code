({
	FetchDataHelper: function(component, event) {
        var action = null;
        switch(component.get("v.tabId"))
        {
            case "tab-scoped-1":
                action = component.get("c.fetchSkillComment");
                break;
           	case "tab-scoped-2":
                action = component.get("c.fetchPersonalityComment");
                break;
            case "tab-scoped-3":
                action = component.get("c.fetchEvaluationComment");
                break;
        }
        action.setParams({
            'employeeId': component.get("v.recordId"),
            'typeId': component.get("v.typeId"),
            'modeId': component.get("v.modeId"),
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
        var action = null;
        switch(component.get("v.tabId"))
        {
            case "tab-scoped-1":
                action = component.get("c.fetchSkillComment");
                break;
           	case "tab-scoped-2":
                action = component.get("c.fetchPersonalityComment");
                break;
            case "tab-scoped-3":
                action = component.get("c.fetchEvaluationComment");
                break;
        }
        component.set("v.skip", (parseInt(component.get("v.skip")) + parseInt(component.get("v.top"))).toString());
        action.setParams({
            'employeeId': component.get("v.recordId"),
            'typeId': component.get("v.typeId"),
            'modeId': component.get("v.modeId"),
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