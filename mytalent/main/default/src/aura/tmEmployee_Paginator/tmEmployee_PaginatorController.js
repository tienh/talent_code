({
	myAction : function(component, event, helper) {
		
	},
    
    previousPage : function(component) {
        var pageChangeEvent = component.getEvent("pagePrevious");
        pageChangeEvent.fire();
	},
    
	nextPage : function(component) {
        var pageChangeEvent = component.getEvent("pageNext");
        pageChangeEvent.fire();
	}
})