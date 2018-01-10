({
    toggleSpinner: function(component, event, helper) {
        helper.ToggleSpinnerHelper(component, event);
    },
    
    init: function(component, event, helper) {
        component.set("v.userInfo", JSON.parse(window.localStorage.getItem('UserInfo')));
		helper.SearchHelper(component, event);
    },
    
    evaluate: function(component, event, helper) {
        helper.EvaluateHelper(component, event);
    },
    
    search: function(component, event, helper) {
        helper.EvaluateHelper(component, event);
        helper.SearchHelper(component, event);
    },
    
    changeComment: function(component, event, helper) {
        component.set("v.errorMessage", {});
    },
    
    addItem: function(component, event, helper) {
        if (!helper.ValidationHelper(component, event)) {
           return;
       	}
        helper.AddHelper(component, event);
        helper.ClearValueHelper(component, event);
  	},
    
    cancel: function(component, event, helper) {
        helper.ClearValueHelper(component, event);
  	}
})