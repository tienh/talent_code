({
    GetTagHelper: function(component, event) {
        var action = component.get("c.getTag");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var storeResponse = response.getReturnValue();
                component.set("v.tags", storeResponse);
            }
        });
        
        $A.enqueueAction(action);
    },
    
   SaveHelper: function(component, event) {
        var action = component.get("c.saveComment");
        action.setParams({
            'Tag': component.get("v.tag"),
            'Comment': component.get("v.comment")
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
            }
        });
        
        $A.enqueueAction(action);
    }
})