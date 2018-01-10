({
    getInfo : function(component) {
        var action = component.get("c.findById");
        var empId = component.get("v.recordId");
        
        if (empId != null) {
            action.setParams({
                "employeeId": empId
            });
            action.setCallback(this, function(response) {
                //debugger; // the JS debugger will pause here
                var result = response.getReturnValue();
                console.log('Page %d loaded in %fms', performance.now() - startTime);
                if (result != null) {
                    component.set("v.employee", result[0]);
                    //debugger; // the JS debugger will pause here
					
                    // Set Favorite rate
                   	component.set("v.favRate", result[0].Employee_Hiring__r.Favorite__c);
                }
            });
            var startTime = performance.now();
            $A.enqueueAction(action);
        }
	},
})