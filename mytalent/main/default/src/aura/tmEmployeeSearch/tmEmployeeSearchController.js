({
	handleClick : function(component, event, helper) {
        var searchKey = component.get("v.searchKey") || "";
        var myEvent = $A.get("e.c:tmEvt_Employee_SearchChange");
        
        myEvent.setParams({
            "searchKey": searchKey
        });
        myEvent.fire();
    },
    
    keyPress: function(component, event, helper) {
        if (event.keyCode === 13) { //Enter keypress
            // Call handleClick event
            var caller = component.get('c.handleClick');
        	$A.enqueueAction(caller);
        }
    }

})