({
    init: function(component, event, helper) {
        component.set("v.userInfo", JSON.parse(window.localStorage.getItem('UserInfo')));
    },
    
	editItem: function(component, event, helper) {
        helper.EditHelper(component, event);
  	},
    
    saveItem: function(component, event, helper) {
        if (!helper.ValidationHelper(component, event)) {
           return;
       	}
        helper.SaveHelper(component, event);
  	},
    
    cancel: function(component, event, helper) {
        helper.CancelHelper(component, event);
  	},
    
    confirmDeleteItem: function(component, event, helper) {
        helper.ConfirmDeleteHelper(component, event);
  	},
    
    deleteItem: function(component, event, helper) {
        helper.DeleteHelper(component, event);
  	}
})