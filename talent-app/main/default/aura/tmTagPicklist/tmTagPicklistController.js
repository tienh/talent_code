({
	init: function(component, event, helper) {
		helper.GetTagsHelper(component, event);
	},
    
    destroyPicklist: function(component, event, helper) {
        //$A.util.addClass(component.find("tagPicklistabc"), "hide-picklist");
        component.find("tagPicklistabc").destroy();
	}
})