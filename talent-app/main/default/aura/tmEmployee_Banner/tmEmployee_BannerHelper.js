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
                    
                    // Set Rank path & Rating path
                    var rankPath = $A.get('$Resource.' + result[0].Employee_Hiring__r.Rank_Ref_CM__c);
                    var ratingPath = $A.get('$Resource.' + result[0].Employee_Hiring__r.Rating_Ref_CM__c);
                    component.set("v.rankPath", rankPath);
                    component.set("v.ratingPath", ratingPath);
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