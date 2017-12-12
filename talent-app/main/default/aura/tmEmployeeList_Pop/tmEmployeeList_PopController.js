({
    init: function(component, event, helper) {
        var dfClass = "slds-media slds-m-bottom--small slds-media--center";
        var cssClass = component.get("v.choosen") ? dfClass + " selectedRow" : dfClass;
        component.set("v.cssClass", cssClass);
    },  
    
	navigateChangeView : function(component) {
		var recordId = component.get("v.emp.Id");
        var myEvent = $A.get("e.force:navigateToSObject");
        myEvent.setParams({
            "recordId": recordId
        });
        myEvent.fire();
	},
})