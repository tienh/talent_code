({
    GetTagsHelper: function(component, event) {
        var action = component.get("c.getTags");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.tags", response.getReturnValue());
            }
        });
        
        $A.enqueueAction(action);
    }
})