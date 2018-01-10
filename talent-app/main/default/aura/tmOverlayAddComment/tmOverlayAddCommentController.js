({
    init: function(component, event, helper) {
        var currentYear = (new Date()).getFullYear().toString();
        component.set("v.currentYear", currentYear);
    },
    
    showToggle: function(component, event, helper) {
        helper.ToggleHelper(component, event);
        if (component.get("v.editMode") == 2) {
        	helper.GetItemHelper(component, event);
        }
    },

  	hideToggle: function(component, event, helper) {
   		helper.ToggleHelper(component, event);
        helper.ClearValueHelper(component, event);
  	},
    
    saveItem: function(component, event, helper) {
        if (!helper.ValidationHelper(component, event)) {
           return;
       	}
        
        if (component.get("v.editMode") == 1) {
        	helper.AddHelper(component, event);
        }
        else {
            helper.EditHelper(component, event);
        }
        helper.ToggleHelper(component, event);
        helper.ClearValueHelper(component, event);
  	},
    
    confirmDeleteItem: function(component, event, helper) {
        helper.ConfirmDeleteHelper(component, event);
  	},
    
    deleteItem: function(component, event, helper) {
        helper.DeleteHelper(component, event);
        helper.ToggleHelper(component, event);
  	},
    
    cancel: function(component, event, helper) {
        helper.ClearValueHelper(component, event);
  	}
})