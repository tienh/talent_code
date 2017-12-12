({
    init: function(component, event, helper) {
        helper.GetTagsHelper(component, event);
    },
    
    showToggle: function(component, event, helper) {
        helper.ToggleHelper(component, event);

    },

  	hideToggle: function(component, event, helper) {
   		helper.ToggleHelper(component, event);
        helper.ClearValueHelper(component, event);
  	},
    
    save: function(component, event, helper) {
        helper.SaveHelper(component, event);
        helper.ToggleHelper(component, event);
        helper.ClearValueHelper(component, event);
  	},
    
    cancel: function(component, event, helper) {
        helper.ClearValueHelper(component, event);
  	}
})