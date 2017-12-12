({
	GetUserInfoHelper: function(component, event) {
		var action = component.get("c.getUserInfo");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.userInfo", response.getReturnValue());
                window.localStorage.setItem('UserInfo', JSON.stringify(component.get("v.userInfo")));
                
                var myURL = "";
                var oPath = window.location.pathname;
                if (oPath != "/one/one.app") {
                    var idx = oPath.indexOf("/", oPath.indexOf("/") + 1);
                    var idx2 = oPath.split("/", 2).join("/").length;
                    myURL = oPath.substring(0, idx);
                }
                window.localStorage.setItem('myURL', myURL);
                
                //debugger; // the JS debugger will pause here
            }
        });
        
        $A.enqueueAction(action);
    },
    
    logoutHelper: function(component, event) {
		var action = component.get("c.customLogout");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                window.localStorage.removeItem("UserInfo");
                var domainUrl = response.getReturnValue()[0];
                var loginUrl = response.getReturnValue()[1];
                window.location.href = domainUrl + "/secur/logout.jsp?retUrl=" + loginUrl;
            }
        });
        
        $A.enqueueAction(action);
    }
})