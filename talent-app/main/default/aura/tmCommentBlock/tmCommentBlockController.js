({
    toggleSpinner: function(component, event, helper) {
        helper.ToggleSpinnerHelper(component, event);
    },
    
    init: function(component, event, helper) {
        component.set("v.userInfo", JSON.parse(window.localStorage.getItem('UserInfo')));
        var currentYear = (new Date()).getFullYear().toString();
        component.set("v.currentYear", currentYear);
    	component.set("v.year", currentYear);
        helper.FetchDataHelper(component, event);
    },
    
    getMore: function(component, event, helper) {
        helper.GetMoreDataHelper(component, event);
    }
})