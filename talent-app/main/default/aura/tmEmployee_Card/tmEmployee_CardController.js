({
	doInit: function(component, event, helper) {
        component.set("v.myPath", window.localStorage.getItem('myURL'));
    },
    
    navigateToDetailsView : function(component) {
		var employee = component.get("v.employee");
        var myEvent = $A.get("e.force:navigateToSObject");
        myEvent.setParams({
            "recordId": employee.Id
        });
        myEvent.fire();
        
        //var urlEvent = $A.get("e.force:navigateToURL");
        //urlEvent.setParams({
        ////  	"url": "/profile",
        ////    "recordId": employee.Id
        //    "url": '/profile?recordId=' + employee.Id
        //});
        //urlEvent.fire();
	},

	employeeSelected : function(component) {
		var employee = component.get("v.employee");
        var myEvent = $A.get("e.ltng:selectSObject");
        myEvent.setParams({"recordId": employee.Id, channel: "Employees"});
        myEvent.fire();
    }
})