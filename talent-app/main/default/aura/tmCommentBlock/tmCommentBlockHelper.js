({
    ToggleSpinnerHelper : function(component,event) {
    	$A.util.toggleClass(component.find("spinner"), "slds-hide");
   	},
    
	FetchDataHelper: function(component, event) {
        this.ToggleSpinnerHelper(component, event);
        
        var action = null;
        switch(component.get("v.tabId"))
        {
            case "tab-scoped-1":
                action = component.get("c.fetchSkillComment");
                break;
           	case "tab-scoped-2":
                action = component.get("c.fetchPersonalityComment");
                break;
        }
        action.setParams({
            'employeeId': component.get("v.recordId"),
            'typeId': component.get("v.typeId"),
            'modeId': component.get("v.modeId"),
            'year': component.get("v.year")
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = [{ year: component.get("v.year"), comments: response.getReturnValue()[1] }];
                component.set("v.count", response.getReturnValue()[0]);
                component.set("v.result", result);
            }
        });
        this.ToggleSpinnerHelper(component, event);
        
        $A.enqueueAction(action);
    },
    
    GetMoreDataHelper: function(component, event) {
        this.ToggleSpinnerHelper(component, event);
        
        var action = null;
        switch(component.get("v.tabId"))
        {
            case "tab-scoped-1":
                action = component.get("c.fetchSkillComment");
                break;
           	case "tab-scoped-2":
                action = component.get("c.fetchPersonalityComment");
                break;
        }
        component.set("v.year", (parseInt(component.get("v.year")) - 1).toString());
        action.setParams({
            'employeeId': component.get("v.recordId"),
            'typeId': component.get("v.typeId"),
            'modeId': component.get("v.modeId"),
            'year': component.get("v.year")
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = [{ year: component.get("v.year"), comments: response.getReturnValue()[1] }];
                component.set("v.count", response.getReturnValue()[0]);
                component.set("v.result", component.get("v.result").concat(result));
            }
        });
        this.ToggleSpinnerHelper(component, event);
        
        $A.enqueueAction(action);
    }
})