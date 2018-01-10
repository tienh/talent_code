({
    FetchPersonalityTypeDataHelper: function(component, event) {
        var action = component.get("c.fetchPersonalityType");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.resultPersonalityType", response.getReturnValue());
            }
        });
        
        $A.enqueueAction(action);
    },
    
	FetchPersonalityMethodDataHelper: function(component, event) {
        var action = component.get("c.fetchPersonalityMethod");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.resultPersonalityMethod", response.getReturnValue());
            }
        });
        
        $A.enqueueAction(action);
    }
})