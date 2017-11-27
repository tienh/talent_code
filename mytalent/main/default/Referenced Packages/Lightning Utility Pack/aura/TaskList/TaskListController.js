({
	getTaskList : function(component, event, helper) 
    {
        console.log(' 1: ');
        var dateRange = {
            "Today":null,
            "This Week":7,
            "This Month":30
        };
		var action = component.get("c.getTaskActivity");
        console.log(' 2: ');
        var limitRecord = component.get("v.totalResults");
        var dateRangeVal = component.get("v.DateRange");
        var showAllUsers = component.get("v.ShowAllUsers") == 'My Tasks' ? true :false;
        
        console.log(' 3: ');
        
        action.setParams( {"limitResults":limitRecord, "showAllUsers":showAllUsers});
        
		console.log(' 4: ');
        
        action.setCallback(this, function(response) 
        {
           console.log(' actionjjj: '+JSON.stringify(response.getReturnValue()));
           var state = response.getState();
            
            if (state === "SUCCESS") 
            {
                console.log("From server: " + response.getReturnValue());
                component.set("v.TaskList", response.getReturnValue());
            }
            else if (state === "ERROR") 
            {
                var errors = response.getError();
                if (errors) 
                {
                    $A.log("Errors", errors);
                    if (errors[0] && errors[0].message) 
                    {
                        //$A.error("Error message: " + errors[0].message);
                    }
                } 
                else 
                {
                    //$A.error("Unknown error");
                }
           }
           setTimeout( function() 
           {
           		$A.enqueueAction(action);
           }, 9000);
        });
        console.log(' 5: ');
        $A.enqueueAction(action);
	},
    
    navToTask : function (component, event, helper) 
    {
        var accountId= event.currentTarget.id;
       	//alert(accountId);
        //alert(' == '+event+ ' || '+component.getGlobalId());
        var navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
          "recordId": accountId,
        });
        //console.log(' ==> '+event.target.id):
        
        navEvt.fire();
	}
})