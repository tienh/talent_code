({
    init: function(component, event, helper) {
        helper.GetUserInfoHelper(component, event);
    },
    
    navigateToHome : function(component) {
        var urlEvent = $A.get("e.force:navigateToURL");
        urlEvent.setParams({
          	"url": "/",
        });
        urlEvent.fire();
	},
    
    logout: function(component, event, helper) {
        helper.logoutHelper(component, event);
	}
})