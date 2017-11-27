({

    doInit: function(component, event, helper) {
        helper.getEmployees(component);
    },

    onRangeChange: function(component, event, helper) {
        component.set("v.minPrice", event.getParam("minValue"));
        component.set("v.maxPrice", event.getParam("maxValue"));
        helper.getEmployees(component);
	},
    
    onEmployeeSearchChange: function(component, event, helper) {
        debugger; // the JS debugger will pause here
        component.set("v.searchKey", event.getParam("searchKey"));
        helper.getEmployees(component);
    },
    
    onEinsteinVisionEvent: function(component, event, helper) {
        var predictions = event.getParam("predictions");
        if (predictions && predictions.length>0) {
            component.set("v.searchKey", predictions[0].label);
            helper.getEmployees(component);
        }
    },

    onPagePrevious: function(component, event, helper) {
		var page = component.get("v.page") || 1;
        page = page - 1;
        helper.getEmployees(component, page);
	},
    
	onPageNext: function(component, event, helper) {
		var page = component.get("v.page") || 1;
        page = page + 1;
        helper.getEmployees(component, page);
	}
})