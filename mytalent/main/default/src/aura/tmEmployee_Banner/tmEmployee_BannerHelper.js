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
                }
            });
            var startTime = performance.now();
            $A.enqueueAction(action);
        }
	},
    
    getParameterByName: function(component, event, name) {
        name = name.replace(/[\[\]]/g, "\\$&");
        var url = window.location.href;
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
        var results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
})