({
    init: function(component, event, helper) {
        helper.GetTagHelper(component, event);
    },
    
  	showToggle: function(component, event, helper) {
    	helper.toggleHelper(component, event);
  	},

  	hideToggle : function(component, event, helper) {
        component.set("v.tag", "");
        component.set("v.comment", "");
   		helper.toggleHelper(component, event);
  	},
    
    emptyText: function(component, event, helper) {
        component.set("v.tag", "");
        component.set("v.comment", "");
  	},
    
    save: function(component, event, helper) {
        var Tag = component.get("v.selectedTag");
        var Comment = component.get("v.comment");
        console.log(Tag);
        helper.SaveHelper(component, event);
  	}
})