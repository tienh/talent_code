({
    doInit: function(component, event, helper) {
        helper.getEmployees(component);
    },
    
    onEmployeeSearchChange: function(component, event, helper) {
        //debugger; // the JS debugger will pause here
        component.set("v.searchKey", event.getParam("searchKey"));
        helper.getEmployees(component);
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
	},
   	
})