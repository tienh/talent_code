({
   SaveHelper: function(component, event) {
        var action = component.get("c.SaveComment");
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