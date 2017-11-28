({
  	showToggle: function(component, event, helper) {
    	helper.toggleHelper(component, event);
  	},

  	hideToggle : function(component, event, helper) {
        component.find("tag").set("v.value", "");
        component.find("comment").set("v.value", "");
   		helper.toggleHelper(component, event);
  	},
    
    emptyText: function(component, event, helper) {
        component.find("tag").set("v.value", "");
        component.find("comment").set("v.value", "");
  	},
    
    save: function(component, event, helper) {
        var Tag = component.find("tag").get("v.value");
        var Comment = component.find("comment").get("v.value");
        helper.SaveHelper(component, event);
  	}
})