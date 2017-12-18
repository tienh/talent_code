({
    init: function(component, event, helper) {
		$A.createComponent(
            "c:tmTagPicklist",
            {
                "aura:id":"tagPicklist",
                "selectedTags": component.getReference("v.selectedTags")
            },
            function(newComponent , status, errorMessage){
                if (status === "SUCCESS") {
                    var parent = component.find("divPicklist");
                    var body = parent.get("v.body");
                    body.push(newComponent);
                    parent.set("v.body", body);
                }
                else if (status === "INCOMPLETE") {
                    console.log("No response from server or client is offline.");
                }
                else if (status === "ERROR") {
                    console.log("Error: " + errorMessage);
                }
            }
        );
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
        helper.SaveHelper(component, event);
        helper.ToggleHelper(component, event);
        helper.ClearValueHelper(component, event);
  	},
    
    deleteItem: function(component, event, helper) {
        helper.DeleteHelper(component, event);
        helper.ToggleHelper(component, event);
        helper.ClearValueHelper(component, event);
  	},
    
    cancel: function(component, event, helper) {
        helper.ClearValueHelper(component, event);
  	}
})