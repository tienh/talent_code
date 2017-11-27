({
	updateAllClosedCases : function(component, event, helper) {
		//alert('1');
        //console.log("I am called ");
        //alert('2');
		var action = component.get("c.getAllClosedCases")
        //console.log(' action: '+JSON.stringify(action));
        action.setCallback(this, function(response) {
           var state = response.getState();
           //alert(' response returned '+response);
            // This callback doesn’t reference cmp. If it did,
            // you should run an isValid() check
            //if (cmp.isValid() && state === "SUCCESS") {
            if (state === "SUCCESS") {
                // Alert the user with the value returned
                // from the server
                //console.log("From server: " + response.getReturnValue());
                component.set("v.allClosedCount", response.getReturnValue());
                // You would typically fire a event here to trigger
                // client-side notification that the server-side
                // action is complete
            }
            //else if (cmp.isValid() && state === "ERROR") {
            else if (state === "ERROR") {
                var errors = response.getError();
                //alert("error "+ errors);
                if (errors) {
                    $A.logf("Errors", errors);
                    if (errors[0] && errors[0].message) {
                        $A.error("Error message: " + errors[0].message);
                    }
                } else {
                    $A.error("Unknown error");
                }
           }
            //var int_action = this;
            setTimeout( function() {
           		$A.enqueueAction(action);
            }, 3000);
        });
        $A.enqueueAction(action);
	}
	}
})