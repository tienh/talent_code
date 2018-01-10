({
	doInit: function(component, event, helper) {
        component.set("v.myPath", window.localStorage.getItem('myURL'));
        
        // Set Rank path
        var rankPath = $A.get('$Resource.' + 
                              component.get("v.employee").Employee_Hiring__r.Rank_Ref_CM__c);
        component.set("v.rankPath", rankPath);
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
        
        var recEvent = $A.get("e.force:navigateToSObject");
        recEvent.setParams({
            "recordId": employee.Id
        });
        recEvent.fire();
    }
})