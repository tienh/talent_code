({
	getLoginHistoryJS : function(component, event, helper) 
    {
		var action = component.get("c.getLoginHistory")
        
        var limitRecord = component.get("v.totalResults");
        //var statename = component.get("v.statenames");
        
        action.setParams( {"limitResults":limitRecord});
        //alert(' cname: '+countryname+' sname: '+statename);
        //console.log(' action: '+JSON.stringify(action));
        action.setCallback(this, function(response) 
        {
           //console.log(' actionjjj: '+JSON.stringify(response));
           var state = response.getState();
            
            if (state === "SUCCESS") 
            {
                //console.log("From server: " + response.getReturnValue());
                component.set("v.loginhistory", response.getReturnValue());
            }
            else if (state === "ERROR") 
            {
                var errors = response.getError();
                if (errors) 
                {
                    $A.logf("Errors", errors);
                    if (errors[0] && errors[0].message) 
                    {
                        $A.error("Error message: " + errors[0].message);
                    }
                } 
                else 
                {
                    $A.error("Unknown error");
                }
           }
           setTimeout( function() 
           {
           		$A.enqueueAction(action);
           }, 9000);
        });
        $A.enqueueAction(action);
	}
	
})